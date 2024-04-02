from keras.preprocessing import image
import numpy as np
import requests
from PIL import Image
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
    with open('model_files/labels2.json', 'rb') as lb:
        labels = pickle.load(lb)
    print(labels)
    # Load the Keras model
    loaded_model = tf.keras.models.load_model("model_files/model2.h5")

    result = []
    # Converting Base64 string to Image
    for i in imgdata:
        response = requests.get(i)
        new_image = Image.open(io.BytesIO(response.content))
        new_image = new_image.resize((256, 256))

        # Convert image to numpy array
        # image_array = np.array(image)
        image_array = image.img_to_array(new_image)

        # # Reshape image array to match model input shape
        image_array = np.expand_dims(image_array, axis=0)

        # Getting prediction from model
        y_result = loaded_model.predict(image_array)
        result_idx = np.argmax(y_result)
        result_idx = result_idx

        # Getting Plant disease from result
        for key, value in labels.items():
            if value == result_idx:
                plant_disease = key
                break
        result.append(get_data(plant_disease))
    
    
    # response = requests.get(imgdata)
    # new_image = Image.open(io.BytesIO(response.content))
    # new_image = new_image.resize((256, 256))

    # # Convert image to numpy array
    # # image_array = np.array(image)
    # image_array = image.img_to_array(new_image)

    # # # Reshape image array to match model input shape
    # image_array = np.expand_dims(image_array, axis=0)

    # # Getting prediction from model
    # y_result = loaded_model.predict(image_array)
    # result_idx = np.argmax(y_result)
    # result_idx = result_idx
    
    # # Getting Plant disease from result
    # for key, value in labels.items():
    #     if value == result_idx:
    #         plant_disease = key
    #         break
    # result = get_data(plant_disease)

    return result