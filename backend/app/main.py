from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from llama_index.multi_modal_llms.openai import OpenAIMultiModal
from llama_index.multi_modal_llms.generic_utils import load_image_urls
from llama_index import SimpleDirectoryReader, VectorStoreIndex, StorageContext, load_index_from_storage
from llama_index.llms import OpenAI
from dotenv import load_dotenv

load_dotenv()

class OCR_Input(BaseModel):
    patient_id:str = ""
    message:str
    img_url:str

app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api")
def get_commodities():
    # Confirm JSON data preparation
    return ""

@app.post("/image")
def image_ocr(data:OCR_Input):
    image_urls = [data.img_url]

    image_documents = load_image_urls(image_urls)

    openai_mm_llm = OpenAIMultiModal(
        model="gpt-4-vision-preview"
    )

    image_response = openai_mm_llm.complete(
        prompt="""
        Describe the images as an alternative text. The numbers in the image have 
        to be carefully extracted along with the data field names. Do not talk 
        anything about the image other than the metric data and analysis.
        DO NOT ADD ANY FILLER WORDS IN THE BEGINNING. YOU ONLY HAVE TO ANSWER THE QUERY.
        """,
        image_documents=image_documents,
    )
    
    print(image_response)

    llm=OpenAI(model='gpt-4-vision-preview')

    documents = SimpleDirectoryReader("app/data").load_data()
    index = VectorStoreIndex.from_documents(documents)

    index.storage_context.persist('app/data/index')
    storage_context = StorageContext.from_defaults(persist_dir='app/data/index')
    index = load_index_from_storage(storage_context)

    prompt = f"""
    You are an expert in analysing cardiac medical data of patients. Here's the health metrics information
    about the patient: {image_response}. Here are the symptoms the patient experiences: {data.message}. You have
    to provide a detailed analysis of what the disease is based on the information you have. If any data
    is missing, feel free to make your assumptiosnbased on the information you have. 
    DO NOT ADD ANY FILLER WORDS IN THE BEGINNING. YOU ONLY HAVE TO ANSWER THE QUERY. 
    """
    
    query_engine = index.as_query_engine(llm=llm)
    response = query_engine.query(prompt)
    if hasattr(response, 'to_dict'):
        response_data = response.to_dict()
    else:
        response_data = {
            'response': str(response) 
        }

    return response_data
    