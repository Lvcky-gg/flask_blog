FROM node:16 as build 
WORKDIR /view
COPY view/frontend /view/
RUN npm install
RUN npm run build

FROM python:3.9



WORKDIR /app

COPY requirements.txt /app/





RUN pip install -r requirements.txt
RUN pip install psycopg2-binary

COPY . /app/ 

COPY --from=build /view/build /app/view/frontend/build

CMD /bin/sh -c 'echo "Please wait . . ." && sleep 10  && gunicorn --bind 0.0.0.0:5000 "controller:app"'