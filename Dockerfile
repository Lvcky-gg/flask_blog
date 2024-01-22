FROM python:3.9
# FROM node:16

RUN apt-get update || : && apt-get install python3.9 -y


WORKDIR /app

COPY requirements.txt /app/




RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

COPY . /app/

CMD /bin/sh -c 'echo "Please wait . . ." && sleep 10 && cd ./view/frontend && npm install && npm run build && cd ../../  && gunicorn --bind 0.0.0.0:5000 "controller:app"'