export default function Tile({rowIndex, colIndex}) {
    const helper = (rowIndex, colIndex) => {
        console.log("Row index = ", rowIndex);
        console.log("Column index = ", colIndex);
    };
  return (
        <div onClick={() => helper(rowIndex, colIndex)} className={`w-[75px] h-[75px] ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#ebecd0]' : 'bg-[#779556]'}`}></div>
    )
}
