from keras.preprocessing import image
import numpy as np
import requests
from PIL import Image
from rembg import remove

import torch.nn as nn
import torch.nn.functional as F
import pickle
import io
import json
import tensorflow as tf


def get_data(plant_disease):
    with open("model_files/data.json", 'r', encoding='utf-8') as f:
        remedies = json.load(f)
    for key in remedies:
        if key == plant_disease:
            return remedies[key]



def predict_plant(imgdata):
    with open('model_files/labels.json', 'rb') as lb:
        labels = pickle.load(lb)

    # Load the Keras model
    loaded_model = tf.keras.models.load_model("model_files/model.h5")

    # Converting Base64 string to Image
    response = requests.get(imgdata)
    new_image = Image.open(io.BytesIO(response.content))

    # <PIL.Image.Image image mode=RGBA size=300x400 at 0x1C1908D6350>
    output = remove(new_image, bgcolor=(0, 0, 0, 255))
    output = output.resize((256, 256))
    output = output.convert("RGB")
    output.save('output.jpg', format="JPEG")
    output_image = Image.open('output.jpg')
    
    # Resizing Image
    new_image = output_image

    # Convert image to numpy array
    # image_array = np.array(image)
    image_array = image.img_to_array(new_image)

    # # Reshape image array to match model input shape
    image_array = np.expand_dims(image_array, axis=0)

    # Getting prediction from model
    y_result = loaded_model.predict(image_array)
    result_idx = np.argmax(y_result)
    
    # Getting Plant disease from result
    for key, value in labels.items():
        if value == result_idx:
            plant_disease = key
            break
    result = get_data(plant_disease)

    return result