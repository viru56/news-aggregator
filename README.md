# React News Aggregator Project

This is a test project 

#### How to run this project locally

## Installation

```bash
npm install
```

### Create a .env file and add your project keys. you can find the keys in .env.example file

## Run

```bash
npm run dev
```


## How to run project with Docker
Please make sure you have docker installed

```bash

# Create docker image
docker build .  -t news-aggregator

# Run docker 
docker run -dp 8080:8080 news-aggregator
