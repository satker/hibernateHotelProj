FROM openjdk:8u151-jre-alpine
VOLUME /tmp
ARG JAR_FILE
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["sh","-c","java $JVM_OPTIONS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]