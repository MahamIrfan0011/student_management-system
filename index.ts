#!/usr/bin/env node

import inquirer from "inquirer";

//create a class with student name
class Student{
    static counter = 10000;
    id: number;
    name: string;
    course: string[];
    balance: number;

//assigning values
    constructor(name: string){
        this.id = Student.counter++;
        this.name = name;
        this.course = []; //initialize an empty array
        this.balance = 1000;

    }

    //Method to enroll student in a courses

    enroll_course(course: string){
        this.course.push(course);
    }
    //Method to view balance

    view_balance(){
        console.log(`Balance for ${ this.name}is: ${this.balance}`);
    }
    //Method to pay fees

    pay_fees(amount: number){
        this.balance -= amount;

        console.log(`$${amount} Fees paid successfully for ${this.name}`)
    }

    //Method to show status

    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Course: ${this.course}`);
        console.log(`Balance: ${this.balance}`);
    }
}

class student_manager{
    students: Student[];

    constructor(){
        this.students = []
    }

    //Method to add new students
    add_student(name: string){
        let student= new Student(name);
        this.students.push(student)

        console.log(`Student: ${name} added successfully. Student ID ${student.id}`);
    }

    //Method to enroll student in a course
    enroll_student(student_id: number, course: string){
        let student= this.find_student(student_id);
        if(student){
            student.enroll_course(course)
            console.log(`${student.name} enrolled in ${course} successfully`)
        }
    }

    //Method to view balance
    
    view_student_balance(student_id: number){
        let student= this.find_student(student_id)
        if(student){
            student.view_balance()
        }
        else{
            console.log('Student not found.Please enter a correct student ID')
        }     

    }

    //Method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let student= this.find_student(student_id)
        if(student){
            student.pay_fees(amount)
        }
        else{
            console.log('Student not found.Please enter a correct student ID')
        }
    }

    //Method to display student status
    student_status(student_id: number){
        let student= this.find_student(student_id)
        if(student){
            student.show_status()
        }
        
    }

    //Method to find a student by student id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id)
    }
}

async function main(){
    console.log('Welcome to - Student Management System')
    console.log("-".repeat(50));

    let Student_manager = new student_manager();

    //using while loop for running program repeatedly

    while(true){
        let choice= await inquirer.prompt([{
            name: "choices",
            type: "list",
            message: "Select an option",
            choices: [
                "Add student",
                "Enroll student",
                "View student balance",
                "Pay tuition fees",
                "Show status",
                "Exit"
            ]
        }])

        //using switch case

        switch(choice.choices){
            case "Add student":
                let name_input = await inquirer.prompt([{
                    name: "name",
                    type: "input",
                    message: "Enter a student name"
                }]);
                Student_manager.add_student(name_input.name);
                break;
    
           
            case "Enroll student":
                let course_input = await inquirer.prompt([{
                    name: "student_id",
                    type: "number",
                    message: "Enter a Student ID"
                },

                {
                    name: "course",
                    type: "input",
                    message: "Enter a course name"
                }
            ]);
            Student_manager.enroll_student(course_input.student_id, course_input.course)
           break;

           case "View student balance":
           let balance_input = await inquirer.prompt([{
                    name: "student_id",
                    type: "number",
                    message: "Enter a student ID"

           }]);
           Student_manager.view_student_balance(balance_input.student_id)
           break;

           case "Pay tuition fees":
            let pay_tuition_fees = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter a student ID"
            },

            {
                name: "amount",
                type: "number",
                message: "Enter a amount to pay"
            }
           ]);
           Student_manager.pay_student_fees(pay_tuition_fees.student_id, pay_tuition_fees.amount)
           break;

           case "Show status":
            let status_input = await inquirer.prompt([{
                name: "student_id",
                type: "number",
                message: "Enter a student ID"
            }]);
            Student_manager.student_status(status_input.student_id)
            break;

            case "Exit":
                console.log("Exiting...")
                process.exit();
        }
    }
}

//calling a main function
main();
