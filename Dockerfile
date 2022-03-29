FROM nginx:stable-alpine

RUN apk add --update libintl && apk add --virtual build_deps gettext && cp /usr/bin/envsubst /usr/local/bin/envsubst

COPY ./docker-entrypoint.sh /usr/local/bin/

COPY build /usr/share/nginx/html


WORKDIR /usr/local/bin/

RUN ["apk","update"]
RUN ["apk","add","dos2unix"]
RUN ["dos2unix", "docker-entrypoint.sh"]
RUN ["chmod", "+x", "docker-entrypoint.sh"]

EXPOSE 80

ENTRYPOINT ["/bin/sh","/usr/local/bin/docker-entrypoint.sh"]

