import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks()
    .subscribe((tasks) => this.tasks = tasks)
  }

  deleteTask(task: Task) {
    this.taskService.deleteTaskService(task)
    .subscribe(() => 
      this.tasks = this.tasks.filter(item =>
        item.id !== task.id
      )
    )
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder
    this.taskService.toggleReminderService(task).subscribe()
  }

  addTask(task: Task) {
    this.taskService.addTaskService(task)
    .subscribe((task) => this.tasks.push(task))
  }

}
