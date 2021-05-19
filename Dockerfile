FROM strapi/base

WORKDIR /srv/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY . .

RUN mv env.txt .env

# set to staging for that environment
ENV NODE_ENV production 


EXPOSE 1337

ENV PORT=1337
ENV HOST=0.0.0.0

RUN chmod a+x /srv/app/run.sh

CMD ["/srv/app/run.sh"]