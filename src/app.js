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
  const id = uuid();
  const { title, url, techs } = request.body;
  
  const newRepo = ({
    id,
    title,
    url,
    techs,
    likes: 0
  });

  repositories.push(newRepo)
  return response.json(newRepo);
});




app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;
  let indexToUpdate = repositories.findIndex((repoSearch)=>repoSearch.id === id );

  if(indexToUpdate === -1){
    return response.status(400).json({error: 'Repository does not exists'});
  }
  else{
    const updateRepo = {
      id,
      title,
      url,
      techs,
      likes: repositories[indexToUpdate].likes
    }

    repositories[indexToUpdate] = updateRepo;
    return response.status(200).json(repositories[indexToUpdate]);
  }
});




app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const indexToDelete = repositories.findIndex((repoSearch)=>repoSearch.id === id);

  if(indexToDelete === -1){
    return response.status(400).json({ error: 'Repository does not exists' })
  }
  else{
    repositories.splice(indexToDelete, 1);
    return response.status(204);
  }
});



app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const indexToLike = repositories.findIndex((repoSearch)=>repoSearch.id === id);

  if(indexToLike === -1){
    return response.status(400).json({ error: 'Repository does not exists' });
  }
  else{
    repositories[indexToLike].likes += 1;
    return response.status(200).json(repositories[indexToLike]);
  }
});

module.exports = app;
