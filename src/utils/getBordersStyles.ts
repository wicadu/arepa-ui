export enum BorderTypes {
  Dashed = 'dashed',
  Solid = 'solid',
}

function getBordersStyles(size: number, type: BorderTypes, bgColor: string) {
  if (type === BorderTypes.Dashed) {
    return `
      background-image: repeating-linear-gradient(0deg, ${bgColor}, ${bgColor} 10px, transparent 10px, transparent 18px, ${bgColor} 18px), repeating-linear-gradient(90deg, ${bgColor}, ${bgColor} 10px, transparent 10px, transparent 18px, ${bgColor} 18px), repeating-linear-gradient(180deg, ${bgColor}, ${bgColor} 10px, transparent 10px, transparent 18px, ${bgColor} 18px), repeating-linear-gradient(270deg, ${bgColor}, ${bgColor} 10px, transparent 10px, transparent 18px, ${bgColor} 18px);
      background-size: ${size}px 100%, 100% ${size}px, ${size}px 100% , 100% ${size}px;
      background-position: 0 0, 0 0, 100% 0, 0 100%;
      background-repeat: no-repeat;  
    `
  }

  return `border: ${size}px solid ${bgColor};`
}

export default getBordersStyles
