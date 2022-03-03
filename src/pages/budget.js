import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Panell } from '../components/Panell';

function Budget() {

//todos los datos dentro del mismo estado
  const [data, setData] = useState({
    text: [
      {
        title:'Una página web',
        checked: false,
        price: 500
      },
      {
        title: 'Una consultoría SEO',
        checked: false,
        price: 300
      },
      {
        title: 'Una campaña de Google Adds',
        checked: false,
        price: 200
      }
    ],
    pagesNumber: 0,
    languagesNumber: 0, 
    checksTotal: 0,    
    total: 0 
  })

// estado que hará que el Panell, desplegable con dos secciones más, sea visible o no
  const [isVisible, setIsVisible] = useState(false);

  const budgetList = data.text.map((item, index) => {
    if(index === 0) {
      return (
        <div>
          <label><input type="checkbox" value={index} onChange= {(e) => isChecked(e, index)}/>{` ${item.title} (${item.price}€)`}</label>
            <Panell isVisible= {isVisible}>
                <p>Número de páginas <button className='incrementDecrement' name= "pagesNumber" onClick={(e)=> increment(e)}>+</button><input className= "inpExtras" type="text" name= "pagesNumber" value= {data.pagesNumber} onChange= {(e)=> totalExtras(e)}/><button className='incrementDecrement' name= "pagesNumber" value ={data.pagesNumber} onClick={(e)=> decrement(e)}> - </button></p>
                <p>Número de idiomas <button className='incrementDecrement' name= "languagesNumber" onClick={(e)=> increment(e)}>+</button><input className= "inpExtras" type="text" name= "languagesNumber" value= {data.languagesNumber} onChange= {(e)=> totalExtras(e)}/><button className='incrementDecrement' name= "languagesNumber" value ={data.languagesNumber} onClick={(e)=> decrement(e)}> - </button></p>
           </Panell>
        </div>
      )
    } else{
      return <label><input type="checkbox" value={index} onChange= {(e) => isChecked(e, index)}/>{` ${item.title} (${item.price}€)`}</label>
    }
  })  

//incrementa en 1 la cantidad de páginas o idiomas
  const increment= (e) => {
    e.preventDefault();
    if(e.target.name === "pagesNumber") {
      data.pagesNumber++
    } else  if(e.target.name = "languagesNumber"){
      data.languagesNumber++
    }
    data.checksTotal = data.pagesNumber * data.languagesNumber *30;
    data.total = data.total + data.checksTotal;
    setData({...data});
  }
// decrementa en 1 la cantidad de páginas o idiomas
  const decrement = (e) => {
    e.preventDefault();
    if(e.target.name === "pagesNumber") {
      data.pagesNumber--
    } else  if(e.target.name = "languagesNumber"){
      data.languagesNumber--
    }
    data.checksTotal = data.pagesNumber * data.languagesNumber *30;
    data.total = data.total - data.checksTotal;
    setData({...data});
  }

//para que las tres opciones principales sumen en el total según se haga check en el checkbox
  const isChecked = (e, index) => {
    data.text.map((item, index2) => {
      if(index === index2 && e.target.checked === true) {
        item.checked = true;
        data.total = data.total + item.price;
        setData({...data});        
        {index2 === 0 ? setIsVisible(true) : setIsVisible(false)}
      } else if((index === index2 && e.target.checked === false)) {
        item.checked = false;
        data.total = data.total - item.price;
        setData({...data});
        {index2 === 0 ? setIsVisible(false) : setIsVisible(true)}
      }
    });    
  }
//suma los extras de las páginas e idiomas al total
  const totalExtras = (e) => {
    if(e.target.name === "pagesNumber") {
      data.pagesNumber = e.target.value;
      setData({...data});
    } else {
      data.languagesNumber = e.target.value;
      setData({...data})
    }
    data.checksTotal = data.pagesNumber * data.languagesNumber *30;
    data.total = data.total + data.checksTotal;
    setData({...data});
  }

//estado para guardar varios presupuestos a través del localStorage. Cuando lo guardo no me aparecen los datos anteriores sino que lo suplanta por el nuevo
  const [budgetLists, setBudgetLists] = useState([]);
  const handleBudget = (e) => {
    e.preventDefault();
    localStorage.setItem('data', JSON.stringify(data));
    setBudgetLists(localStorage.getItem('data'));
  }
  console.log(budgetLists);

  
  

  return (
    <div>
      <h3 className='ms-3 mt-3'>¿Qué quieres hacer?</h3>
      <form className='formulary'>
        {budgetList}
        <p>{`Precio: ${data.total}€`}</p> 
        <button onClick= {handleBudget}>Guardar presupuesto</button>
      </form>
    </div> 
  )
}

export default Budget;