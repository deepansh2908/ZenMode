let btnAdd=$(`#btnAdd`)
let btnReset=$(`#btnReset`)
let btnSort=$(`#btnSort`)
let btnCleanup=$(`#btnCleanup`)
let ulTasks=$(`#ulTasks`)
let inputTask=$(`#inputTask`)

function addItem(){
    let listItem=$('<li>',{
        'class':'list-group-item',
        text:inputTask.val()
    })
    listItem.click((event)=>{
        listItem.toggleClass('done')
    })
    if(inputTask.val().length!=0){
        ulTasks.append(listItem)
    }
    inputTask.val('')
    toggleInput()
}

inputTask.keypress((e)=>{
    if(e.which==13) addItem()
})

btnAdd.click(()=>{
    addItem()
})

btnReset.click(()=>{
    inputTask.val('')
    toggleInput()
})

inputTask.on('input',toggleInput)

function toggleInput(){
    btnAdd.prop('disabled',inputTask.val()=='')
    btnReset.prop('disabled',inputTask.val()=='')
    btnSort.prop('disabled',ulTasks.children().length<1)
    btnCleanup.prop('disabled',ulTasks.children().length<1)
}

function clearDone() {
    $('#ulTasks .done').remove()
    toggleInput()
}
  
function sortTasks() {
    $('#ulTasks .done').appendTo(ulTasks)
    toggleInput()
}
btnCleanup.click(clearDone)
btnSort.click(sortTasks)