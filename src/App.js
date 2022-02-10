import { useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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
  });

  const budgetList = data.text.map((item, index) => {
    return <label><input type="checkbox" value={index} onChange= {(e) => isChecked(e, index)}/>{` ${item.title} (${item.price}€)`}</label>
  })

  const isChecked = (e, index) => {
    data.text.map((item, index2) => {
      if(index === index2 && e.target.checked === true) {
        item.checked = true;
        data.total = data.total + item.price;
        setData({...data});
      } else if((index === index2 && e.target.checked === false)) {
        item.checked = false;
        data.total = data.total - item.price;
        console.log("adios");
        setData({...data});
      }
    });
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
