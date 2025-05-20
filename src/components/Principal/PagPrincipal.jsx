import { useState } from 'react';
import '@google/model-viewer';
import { productos } from '../data/data';
import { Carrito } from '../carrito/Carrito';
import './PagPrincipal.css';
import { Link } from 'react-router-dom';
function PagPrincipal() {
    const [carrito, setCarrito] = useState([]);

    const agregarAlCarrito = (producto) => {
        setCarrito((prev) => {
        const existe = prev.find((item) => item.id === producto.id);
        if (existe) {
            return prev.map((item) =>
            item.id === producto.id
                ? { ...item, cantidad: item.cantidad + 1 }
                : item
            );
        } else {
            return [...prev, { ...producto, cantidad: 1 }];
        }
        });
    };

    return (
        <div className="Principal">
            <h1>Tienda 3D</h1>
            <Link to="/carrito">
          
                <button className="btn-carrito">Ver Carrito</button>
            </Link>
            
            <Carrito carrito={carrito} setCarrito={setCarrito} />
            <div className="galeria">
                {productos.map((item) => (
                <div key={item.id} className="producto">
                    <model-viewer
                    src={item.modelo}
                    alt={item.nombre}
                    auto-rotate
                    camera-controls
                    ar
                    style={{ width: '250px', height: '250px' }}
                    />
                    <h2>{item.nombre}</h2>
                    <p>${item.precio}</p>
                    <button onClick={() => agregarAlCarrito(item)}>Agregar</button>
                </div>
                ))}
            </div>
            </div>
    )
}
export default PagPrincipal;