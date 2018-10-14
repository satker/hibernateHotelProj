FROM openjdk:8u151-jre-alpine
ARG JAR_FILE=/target/app.jar
COPY ${JAR_FILE} hotels.jar
ENV JVM_OPTIONS ""
ENTRYPOINT ["sh","-c","java $JVM_OPTIONS -Djava.security.egd=file:/dev/./urandom -jar", "hotels.jar"]