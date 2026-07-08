import { createSlice , nanoid } from "@reduxjs/toolkit";

let initialState={todos:[{id:1,value:"learn react",isCompleted:false},],
editingTodo:null}


let slice=createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTodo:(state,action)=>{
           let todo= {id:nanoid(),
            value:action.payload,
            isCompleted:false,
            }
            state.todos.push(todo)            
         
        },
        deleteTodo:(state,action)=>{
            state.todos=state.todos.filter(todo=>todo.id!=action.payload)
        },
        completetodo:(state,action)=>{
            const todo=state.todos.find(todo=>todo.id===action.payload )
                      if(todo){
                        todo.isCompleted=!todo.isCompleted;
                      }
        
        },updatetodo:(state,action)=>{
            const {id,value}=action.payload
              const todo=state.todos.find(todo=>todo.id==id)
              if(todo && !todo.isCompleted){
                  todo.value=value
              }
             
},

 setEditingTodo: (state, action) => {
                      let {id,value}=action.payload;   
                const todo=state.todos.find(todo=>todo.id==id);

                if(todo && !todo.isCompleted){
                    state.editingTodo=action.payload;
                }
                          
        }

    }
})

export const {addTodo,deleteTodo,completetodo,updatetodo,setEditingTodo}=slice.actions
export default slice.reducer