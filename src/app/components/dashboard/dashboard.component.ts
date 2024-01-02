import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit  {

  taskObj  = new Task();
  taskArr : Task[] = [];

  editTaskValue: string = '';
  addTaskValue: string = '';


  constructor(private crudService:CrudService){}

  ngOnInit(){
    //console.log('this is working');
    this.addTaskValue = '';
    this.editTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTasks();
    
  }
  getAllTasks() {
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr = res;
      console.log('get all tasks is working');
    },err=>{
      alert('Unable to get all tasks');
    })
  }

  addTask(){
    this.taskObj.task_name = this.addTaskValue;
    //console.log('This add task is woorking');
    this.crudService.addTask(this.taskObj).subscribe(res=>{
        this.ngOnInit();
        this.addTaskValue = '';
    },err=>{
      alert(err);
    })
  }

  editTask(){
    console.log('edit task is working');
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Unable to edit task');
    })
  }

  deleteTask(etask:Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert('Unable to delete task');
    })
  }

  call(etask:Task){
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;

  }


}
