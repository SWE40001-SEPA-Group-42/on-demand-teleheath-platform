function FormInput(props) {
	const { label, onChange, error, id, ...inputProps } = props
	return (
		<div className='input-group'>
			<p>{error}</p>
			<label>{label}</label>
			<input {...inputProps} onChange={onChange} />
		</div>
	)
}

export default FormInput
