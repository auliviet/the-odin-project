import { format } from 'date-fns';
import { Priority } from '/src/scripts/tasks';

import "./styles.css";

export class Card {
    constructor (data) {
        this.id = data.id;
        this.title = data.title;
        this.dueDate = data.dueDate; 
        this.description = data.description;
        this.priority = data.priority;
        this.project = data.project;
        this.isComplete = data.isComplete;

        return this.#render();
    }

    #form() {
        let form = document.createElement("form");
        form.name = this.title;
        form.id = `task-${this.id}`;

        form.append(this.#formHeader());
        form.append(this.#title());
        form.append(this.#description());
        form.append(this.#buttons());

        return form;
    }

    #formHeader() {
        let header = document.createElement("fieldset");
        header.className = "card__header";

        header.append(
            this.#status(), 
            this.#dueDate(), 
            this.#priority());

        return header;
    }

    #status() {
        let status = new Input(
            "checkbox",
            "completion-status",
            "complete"
        )

        switch (this.priority.index) {
            case 0:
                status.className += " red";
                break;

            case 1:
                status.className += " yellow";
                break;

            case 2:
                status.className += " green";
                break;
        
            default:
                break;
        }

        return status;
    }

    #dueDate() {
        let dueDate = new Input(
            "date", 
            "dueDate", 
            format(this.dueDate, "yyyy-MM-dd") 
        ) 

        return dueDate;
    }

    #priority() {
        let select = document.createElement("select");
        select.className = "card__priority";
        select.name = "priority";
        select.id = "priority";

        for (let index in Priority.values) {
            let priority = Priority.values[index];

            let option = document.createElement("option");
            option.value = priority;
            option.textContent = priority;

            if (priority == this.priority.value) {
                option.selected = true;
            }

            select.append(option);
        }

        return select;
    }

    #title() {
        let title = new TextArea(
            "title",
            this.title
        )
        
        return title;
    }

    #description() {
        let description = new TextArea(
            "description", 
            this.description
        );
        
        return description;
    }

    /* #project() {
        let project = document.createElement("div");
        project.className = "card__project-pill";
        project.textContent = `#${this.project}`;

        return project;
    } */

    #buttons() {
        let buttonsRow = document.createElement("div");
        buttonsRow.className = "card__buttons";

        buttonsRow.append(
            new Button("cancel", "reset"),
            new SaveButton(this.id)
        )

        return buttonsRow;
    }

    #render() {
        let card = document.createElement("li");
        card.className = "card";

        
        card.append(this.#form());

        /* section.append(this.#header());
        section.append(this.#title());
        if (this.description != null) {
            section.append(this.#description());
        }
        section.append(this.#project()); */

        return card;
    }
}

class Input {
    constructor(type, name, value = "") {
        let input = document.createElement("input");
        input.type = type;
        input.className = `card__${name}`;
        input.id = name;
        input.name = name;
        input.value = value;

        return input;
    }
}

class TextArea {
    constructor(name, value = "") {
        let textarea = document.createElement("textarea");
        textarea.className = `card__${name}`;
        textarea.id = name;
        textarea.name = name;
        textarea.placeholder = name;
        textarea.value = value;

        return textarea;
    }
}

class Button {
    constructor(name = "", type = "submit") {
        let button = document.createElement("button");
        button.type = type;
        button.className = `card__button-${name}`;
        button.textContent = name;

        return button;
    }
}

class SaveButton extends Button {
    constructor(id) {
        let button = super("save", "submit");
        
        this.id = id;
        button.addEventListener("click", (event) => this.#saveEvent(event));

        return button;
    }

    #saveEvent(event) {
        event.preventDefault();
        console.log("ID = ", this.id)
        
        this.#getFormData();
    }

    #getFormData() {
        let form = document.querySelector(`#task-${this.id}`);
        let title = form.title.value;
        let dueDate = form.dueDate.value;
        let description = form.description.value;
        let priority = form.priority.value;
        //let project = form.project.value;
        //let isComplete = form.isComplete.value;

        console.log(title);
        console.log(dueDate);
        console.log(description);
        console.log(priority);
        //console.log(project);
        //console.log(isComplete);
    }
}
