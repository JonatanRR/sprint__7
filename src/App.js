import { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Panell } from './components/Panell';

function App() {

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
    pagesNumber: "",
    languagesNumber: "",
    total: 0
  })

  const [isVisible, setIsVisible] = useState(false);

  const budgetList = data.text.map((item, index) => {
    if(index === 0) {
      return (
        <div>
          <label><input type="checkbox" value={index} onChange= {(e) => isChecked(e, index)}/>{` ${item.title} (${item.price}€)`}</label>
            <Panell isVisible= {isVisible}>
                <p>Número de páginas <button className='incrementDecrement' name= "pagesNumber" value ={data.pagesNumber} onClick={(e) => increment(e)} >+</button><input className= "inpExtras" type="text" name= "pagesNumber" value= {data.pagesNumber} onChange= {(e) => totalExtras(e)} /><button className='incrementDecrement' name= "pagesNumber" value ={data.pagesNumber} onClick={(e) => decrement(e)}> - </button></p>
                <p>Número de idiomas <button className='incrementDecrement' name= "languagesNumber" value ={data.languagesNumber} onClick={(e) => increment(e)}>+</button><input className= "inpExtras" type="text" name= "languagesNumber" value= {data.languagesNumber} onChange= {(e) => totalExtras(e)} /><button className='incrementDecrement' name= "languagesNumber" value ={data.languagesNumber} onClick={(e) => decrement(e)}> - </button></p>
           </Panell>
        </div>
      )
    } else{
      return <label><input type="checkbox" value={index} onChange= {(e) => isChecked(e, index)}/>{` ${item.title} (${item.price}€)`}</label>
    }
  })

  const increment = (e) => {
    e.preventDefault();
    if(e.target.name === "pagesNumber") {
      data.pagesNumber = parseInt(data.pagesNumber) + 1;
      data.total = data.total + ((data.pagesNumber +1) * 30);
      setData({...data});
    } else if(e.target.name === "languagesNumber") {
      data.languagesNumber = parseInt(data.languagesNumber) + 1;
      data.total = data.total + ((data.languagesNumber + 1) * 30);
      setData({...data});
    }  
  }    

  const decrement = (e) => {
    e.preventDefault();
    if(e.target.name === "pagesNumber") {
      setData({
        ...data,
        pagesNumber: data.pagesNumber - 1,
        total: data.total - ((data.pagesNumber - 1) * 30)
      });
    } else if(e.target.name === "languagesNumber") {
      setData({
        ...data,
        languagesNumber: data.languagesNumber - 1,
        total: data.total - ((data.languagesNumber - 1) * 30)
      });
    } 
  }

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
  const totalExtras = (e) => {
    setData({
      ...data,
      [e.target.name] : e.target.value
    })
    if(e.target.name === "pagesNumber") {
      data.pagesNumber = e.target.value;
    } else {
      data.languagesNumber = e.target.value;
    }
    if(data.pagesNumber || data.languagesNumber === "") {
      setData({
        ...data,
        total : data.total
      })
    } else if(data.pagesNumber !== "") {
      data.pagesNumber = e.target.value;
      setData({
        ...data,
        total: data.total + ((data.pagesNumber * data.languagesNumber) * 30)
      });
    } else if(data.languagesNumber !== "") {
      data.languagesNumber = e.target.value;
      setData({
        ...data,
        total: data.total + ((data.pagesNumber * data.languagesNumber) * 30)
      });
    }    
    setTimeout(() => {
      if(e.target.name && e.target.value !== "") {
        if(e.target.name === "pagesNumber") {
          setData({
            ...data,
            pagesNumber: parseInt(e.target.value)
          });
        } else {
          setData({
            ...data,
            languagesNumber: parseInt(e.target.value)
          });
        }        
      setData({
        ...data,
        total : data.total + e.target.value*30
      });
      } 
    }, 500);
  }

  return (
    <div>
      <h3 className='ms-3 mt-3'>¿Qué quieres hacer?</h3>
      <form className='formulary'>
        {budgetList}
        <p>{`Precio: ${data.total}€`}</p> 
      </form>
    </div> 
  );
}

export default App;
