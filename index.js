console.log("Hello");
const LOCAL_STORAGE_KEY = "tasky";

const cardContainer = document.querySelector(".card__container");

//Array of all cards.
const cardsListDB = [];

const createCard = ({ id, imageUrl, taskTitle, taskType, taskDescription }) => {
  return `
  <div class="col-md-6 col-lg-4 id=${id}">    
  <div class="card mb-3 border">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-success">
        <i class="fas fa-pencil-alt"></i>
      </button>
      <button type="button" class="btn btn-outline-danger">
      <i class="fas fa-dumpster"></i>
      </button>
    </div>
    <img
      src=${imageUrl}
      class="card-img-top"
      alt="card-image"
    />
    <div class="card-body">
      <h5 class="card-title">${taskTitle}</h5>
      <p class="card-text">
      ${taskDescription}
      </p>
      <span class="badge bg-primary">New</span>
    </div>
    <div class="card-footer text-muted">
      <button type="button" class="btn btn-outline-primary float-end">
        Open Task
      </button>
    </div>
  </div>
</div>
    `;
};

const loadInitialTasksCard = () => {
  const initialData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!initialData) return;

  const { allTasks } = JSON.parse(initialData);
  console.log(allTasks);

  allTasks.map((singleCard) => {
    console.log(singleCard);
    const newCard = createCard(singleCard);
    cardContainer.insertAdjacentHTML("beforeend", newCard);
    cardsListDB.push(singleCard);
  });
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, //Unique Id time in millis.
    imageUrl: document.getElementById("ipImageUrl").value,
    taskTitle: document.getElementById("ipTaskTitle").value,
    taskType: document.getElementById("ipTaskType").value,
    taskDescription: document.getElementById("ipTaskDescription").value,
  };

  //window is the parent object of browser.
  //document is the parent object of html.

  cardsListDB.push(taskData);
  localStorage.setItem(
    LOCAL_STORAGE_KEY,
    JSON.stringify({ allTasks: cardsListDB })
  );
  const newCard = createCard(taskData);
  cardContainer.insertAdjacentHTML("beforeend", newCard);
};
