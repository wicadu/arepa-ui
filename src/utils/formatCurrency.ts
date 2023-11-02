export default (value: number = 0): string => isNaN(value) ? '$?' : new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(value)
