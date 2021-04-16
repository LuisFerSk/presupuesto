import { useState } from "react";
import PropTypes from 'prop-types';
import Error from "./Error";
import shortid from "shortid";

const Formulario = ({ restante, setGasto , setCrearGasto}) => {
	const [nombre, setNombre] = useState("");
	const [cantidad, setCantidad] = useState(0);

	const [error, setError] = useState({ value: false, message: "" });

	const gastos = {
		nombre,
		cantidad,
		id: shortid.generate(),
	};

	const agregarGasto = (e) => {
		e.preventDefault();

		if (nombre.trim() === "") {
			setError({ value: true, message: "Nombre no valida" });
			return;
		} else if (isNaN(cantidad)) {
			setError({ value: true, message: "Cantidad no valida" });
			return;
		} else if (cantidad < 1) {
			setError({ value: true, message: "Cantidad menor a 1" });
			return;
		} else if (restante < cantidad) {
			setError({
				value: true,
				message: "Cantidad no puede ser mayor al restante",
			});
			return;
		}

		setError({ value: false, message: "" });

		setGasto(gastos);
        setCrearGasto(true);

		setNombre("");
		setCantidad(0);
	};

	return (
		<form onSubmit={agregarGasto}>
			<h2>Agrega tus gastos aquí</h2>

			{error.value ? <Error mensaje={error.message} /> : null}

			<div className="campo">
				<label>Nombre Gasto</label>
				<input
					type="text"
					className="u-full-width"
					placeholder="Ej. Transporte"
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</div>

			<div className="campo">
				<label>Cantidad Gasto</label>
				<input
					type="number"
					className="u-full-width"
					placeholder="Ej. 300"
					value={cantidad}
					onChange={(e) => setCantidad(parseInt(e.target.value, 10))}
				/>
			</div>

			<input
				type="submit"
				className="button-primary u-full-width"
				value="Agregar Gasto"
			/>
		</form>
	);
};

Formulario.propTypes = {
    restante: PropTypes.number.isRequired,
    setGasto: PropTypes.func.isRequired,
    setCrearGasto: PropTypes.func.isRequired
}

export default Formulario;
