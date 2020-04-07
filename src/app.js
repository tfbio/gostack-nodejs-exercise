const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const id = uuid(); let likes = 0;
  
  const { title, url, techs } = request.body;
  
  repositories.push({
    id,
    title,
    url,
    techs,
    likes
  });
  return response.json({ id });
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  let indexToChange;

  indexToChange = repositories.findIndex((repoSearch) => repoSearch.id === id);
  if(indexToChange === -1){
    return response.status(400).json({error: 'user does not exists'});
  }
  else{
    repositories[indexToChange].title = title;
    repositories[indexToChange].url = url;
    repositories[indexToChange].techs = techs; 

    return response.status(200).send('repository updated');    
  }

});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  let indexToDelete;

  indexToDelete = repositories.findIndex((repoSearch)=>repoSearch.id === id);

  if(indexToDelete === -1){
    return response.status(400).json({ error: 'user does not exists',indexToDelete })
  }
  else{
    repositories.splice(indexToDelete, 1);
    return response.status(200).send('repository deleted');
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  let indexToLike;

  indexToLike = repositories.findIndex((repoSearch)=>repoSearch.id === id);
  if(indexToLike === -1){
    return response.status(400).send('user does not exists');
  }
  else{
    repositories[indexToLike].likes++;
    return response.status(200).send('repository liked');
  }
});

module.exports = app;
