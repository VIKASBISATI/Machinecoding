import React, { useState, useRef, useEffect } from 'react';
import './styles.css';

const KeepNotes = () => {
  const [notes, setNotes] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [selectedNotes, setSelectedNotes] = useState([]);
  const containerRef = useRef(null);
  const selectionBoxRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const sampleNotes = Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Note ${index + 1}`,
      content: `This is the content of note ${index + 1}. Click and drag to select multiple notes.`,
      color: `hsl(${Math.random() * 360}, 70%, 90%)`
    }));
    setNotes(sampleNotes);
  }, []);

  useEffect(() => {
    if (!isDragging || !containerRef.current || !selectionBoxRef.current)
      return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const selectionBox = selectionBoxRef.current.getBoundingClientRect();
        
        const selected = entries
          .filter((entry) => {
            const noteRect = entry.boundingClientRect;
            return (
              noteRect.left < selectionBox.right &&
              noteRect.right > selectionBox.left &&
              noteRect.top < selectionBox.bottom &&
              noteRect.bottom > selectionBox.top
            );
          })
          .map((entry) => parseInt(entry.target.dataset.id));
        
        setSelectedNotes(selected);
      },
      {
        root: containerRef.current,
        threshold: 0.5,
        rootMargin: "0px",
      }
    );

    notes.forEach((note) => {
      const element = document.getElementById(`note-${note.id}`);
      if (element) observer.observe(element);
    });

    observerRef.current = observer;

    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [isDragging, notes, endPoint]);

  const handleMouseDown = (e) => {
    if (e.target.closest('.note-card')) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDragging(true);
    setStartPoint({ x, y });
    setEndPoint({ x, y });
    setSelectedNotes([]);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setEndPoint({ x, y });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
  };

  return (
    <div 
      className="keep-notes-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ position: "relative" }}
    >
      <h1>Keep Notes</h1>
      <div className="notes-grid">
        {notes.map(note => (
          <div
            key={note.id}
            id={`note-${note.id}`}
            data-id={note.id}
            className={`note-card ${selectedNotes.includes(note.id) ? 'selected' : ''}`}
            style={{ backgroundColor: note.color }}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
      {isDragging && (
        <div
          ref={selectionBoxRef}
          className="selection-box"
          style={{
            position: "absolute",
            left: Math.min(startPoint.x, endPoint.x),
            top: Math.min(startPoint.y, endPoint.y),
            width: Math.max(Math.abs(endPoint.x - startPoint.x), 1),
            height: Math.max(Math.abs(endPoint.y - startPoint.y), 1),
          }}
        />
      )}
    </div>
  );
};

export default KeepNotes; 