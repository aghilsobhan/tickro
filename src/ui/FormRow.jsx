const StyleFromRow='grid it'
function FormRow({label,error,children,orientation}) {
    
    return (
        <div className={` grid items-center ${orientation=="vertical"?'grid-cols-1 gap-2.4':'grid-cols-[24rem,1fr,1.2fr] gap-0.8'}`}>
            {label && <label className="font-medium" htmlFor={children.props.id}>{label}</label>}
            {children}
            {error && <span>{error}</span>}
        </div>
    );
}

export default FormRow;