FROM python:3.11
WORKDIR /code
COPY ./requirements.txt /code/requirements.txt
COPY ./model_files /code/model_files
RUN pip install --no-cache-dir -r /code/requirements.txt
COPY . /code/app
ENV TZ Asia/Seoul
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "9002"]
