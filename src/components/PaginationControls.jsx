function PaginationControls({ offset, total, limit, loading, onPrevious, onNext }) {
    return (
        <div style={{ marginTop: "20px"}}>
          <button
            onClick={onPrevious}
            disabled={offset === 0 || loading}
            style={{ marginRight: "10px" }}
          >
            Previous
          </button>
          <button
            onClick={onNext}
            disabled={offset + limit >= total || loading}
          >
            Next
          </button>
        </div>
    );
}

export default PaginationControls