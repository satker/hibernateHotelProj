FROM openjdk:8-jdk-alpine
ADD /target/app.jar hotels.jar
ENTRYPOINT ["java","-jar","hotels.jar"]