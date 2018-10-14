FROM openjdk:8u151-jre-alpine
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENV JVM_OPTIONS ""
ENTRYPOINT ["sh","-c","java $JVM_OPTIONS -Djava.security.egd=file:/dev/./urandom -jar /app.jar"]