from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from model_files.ml_predict import predict_plant
from pydantic import BaseModel

class Image(BaseModel):
    image: str

app = FastAPI()

origins = [
    "http://localhost:8000",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/crop/disease')
def predict(image: Image):
    image = image.image
    result = predict_plant(image)
    return result

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
