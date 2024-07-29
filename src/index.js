// Scripts
import { 
    add,
    endOfMonth, 
    endOfToday, 
    endOfWeek, 
    endOfYesterday, 
    startOfMonth, 
    startOfToday, 
    startOfTomorrow,
    startOfWeek } from 'date-fns';
import { Storage } from "./scripts/storage.js";
import { Task, DateOnly } from './scripts/tasks.js';
import { DOM } from './scripts/display.js';

// Test data
import testData from './test.json';

class Todo {
    constructor() {
        this.tasks = [];
        let data = new Storage(); 

        for (let id in data) {
            let currentTask = data[id];
            this.tasks.push(new Task(currentTask, id));
        }
    }

    updateTask(obj, id) {
        this.tasks[id] = obj;
        Storage.populateStorage(this.tasks);
    }

    createTask(obj) {
        this.tasks.push(new Task(obj, /*id*/));
        Storage.populateStorage(this.tasks);
    }

    get overdue() {
        let startDate = new DateOnly(0);
        let endDate = endOfYesterday();
        let overdueTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(overdueTasks);
    }
    
    get today() {
        let startDate = startOfToday();
        let endDate = endOfToday();
        let todayTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(todayTasks);
    }

    get thisWeek() {
        let startDate = startOfTomorrow();
        let endDate = endOfWeek(startOfToday(), { weekStartsOn: 1 }); 
        let thisWeekTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(thisWeekTasks);
    }

    get thisMonth() {
        let thisWeek = startOfWeek(startOfToday(), { weekStartsOn: 1});
        let nextWeek = add(thisWeek, {weeks: 1});

        let startDate = nextWeek; 
        let endDate = endOfMonth(startOfToday());
        let thisMonthTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(thisMonthTasks);
    }

    get later() {
        let thisMonth = startOfMonth(startOfToday());
        let nextMonth = add(thisMonth, {months: 1});
        let endOfTime = new DateOnly(8640000000000000);

        let startDate = nextMonth;
        let endDate = endOfTime;
        let laterTasks = this.#filterByDate(startDate, endDate);

        return this.#sortByPriority(laterTasks);
    }

    #sortByPriority(tasks = this.tasks) {
        let tasksSorted = tasks.toSorted((a, b) => a.priority.index - b.priority.index);

        return tasksSorted;
    }

    #filterByDate(startDate, endDate) {
        startDate = new DateOnly(startDate);
        endDate = new DateOnly(endDate);

        let tasksFiltered = [];

        for (let task in this.tasks) {
            let currentTask = this.tasks[task];
            let dueDate = new DateOnly(currentTask.dueDate);

            if (dueDate >= startDate &&
                dueDate <= endDate) {
                    tasksFiltered.push(currentTask);
                }
        }

        return tasksFiltered;
    }
}

const tasks = new Todo();

console.log("Overdue: ", tasks.overdue);
console.log("Today: ", tasks.today);
console.log("This week: ", tasks.thisWeek);
console.log("This month: ", tasks.thisMonth);
console.log("Later: ", tasks.later);

let updatedTask = {
    "title": "Create mobile designs",
    "dueDate": "2024-09-23",
    "priority": 1,
    "project": "Mobile"
};

tasks.updateTask(updatedTask, 0);
console.log("Later: ", tasks.later);