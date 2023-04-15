const AddNewNote = document.querySelector('#AddNewNote');
const AddNotesdiv = document.querySelector('.AddNotesdiv');



const UpdateNoteData=()=>{
    const textareaVal = document.querySelectorAll('textarea');
    const saveNote = [];
    textareaVal.forEach((NoteVal)=>{
        return saveNote.push(NoteVal.value)
    })
    
    localStorage.setItem('notes',JSON.stringify(saveNote));

    
}

const newNoteAdd=(text = '')=>{
    let note = document.createElement('div');
    note.classList.add('note');
    let NoteDataHtml = `
                <div class="operation">
                <button class="save"><ion-icon name="save-outline"></ion-icon></button>
                <button class="delete"><ion-icon name="trash-bin-outline"></ion-icon></button>
            </div>
            <div class="main ${text?"":"hidden"}"></div>
            <textarea class="${text?"hidden":""}" name="" id="" cols="19" rows="3"></textarea>
    
    `
    note.insertAdjacentHTML('afterbegin',NoteDataHtml);
    

    const savebtn = note.querySelector('.save');
    const deletebtn = note.querySelector('.delete');
    const main = note.querySelector('.main');
    const textareadata = note.querySelector('textarea');

    
    textareadata.value = text;
    main.innerHTML = text;

    deletebtn.addEventListener('click',()=>{
        note.remove();
        UpdateNoteData();
    })

    savebtn.addEventListener('click',()=>{
        main.classList.toggle('hidden')
        textareadata.classList.toggle('hidden');
        UpdateNoteData();
    })

    textareadata.addEventListener('change',(event)=>{
        const Val = event.target.value
        main.innerHTML = Val;
        
    })


    
    AddNotesdiv.appendChild(note);
    
    UpdateNoteData();

}

const GetBackNotes = JSON.parse(localStorage.getItem('notes'));

if(GetBackNotes){
    GetBackNotes.forEach((note)=>newNoteAdd(note));
}


AddNewNote.addEventListener('click',()=>newNoteAdd());