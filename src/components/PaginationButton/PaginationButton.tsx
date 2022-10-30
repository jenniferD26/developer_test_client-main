interface PageButtonProps{
    onClick: any;
    currentPage: number;
    disableLimit: number;
    className: string;
    text: string;
}

function PaginationButton({onClick, currentPage, disableLimit, className, text} : PageButtonProps) {

    function isDisabled(){
        console.log(disableLimit);
        return currentPage === disableLimit;
    }

    return (
        <button
            onClick={onClick} 
            className={`${className} ${isDisabled() ?  'disabled' : ''}`}>
            {text}
      </button>
    )
}

export default PaginationButton