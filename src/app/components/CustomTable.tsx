import React, { useState } from 'react';
import { Input, Button } from '@nextui-org/react';

const CustomTable: React.FC = () => {
    const [data, setData] = useState([
        { id: 1, column1: 'Row 1, Cell 1', column2: 'Row 1, Cell 2', column3: 'Row 1, Cell 3', column4: 'Row 1, Cell 4' }
    ]);

    const [columns, setColumns] = useState([
        { id: 'column1', name: 'Column 1', inputType: 'text' },
        { id: 'column2', name: 'Column 2', inputType: 'text' },
        { id: 'column3', name: 'Column 3', inputType: 'text' },
        { id: 'column4', name: 'Column 4', inputType: 'text' },
    ]);

    const handleColumnNameChange = (columnId: string, value: string) => {
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.id === columnId ? { ...column, name: value } : column 
            )
        );
    };

    const handleInputChange = (rowId: number, columnId: string, value: string) => {
        setData(prevData =>
            prevData.map(row =>
                row.id === rowId ? { ...row, [columnId]: value } : row
            )
        );
    };

    const removeColumn = (columnId: string) => {
        setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
        setData(prevData => prevData.map(row => {
            const { [columnId]: removed, ...rest } = row;
            return rest;
        }));
    };

    return (
        <div className="border border-background rounded-lg overflow-hidden mx-4">
            {/* Header Row */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}>
                {columns.map((column) => (
                    <div key={column.id} className="p-2 bg-primary-200">
                        <div className="flex items-center gap-2">
                            <Input
                                label={column.name}
                                type={column.inputType}
                                onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                                aria-label={`Column Name: ${column.name}`}
                            />
                            <Button
                                className="rounded-lg bg-danger text-white"
                                size="sm"
                                onClick={() => removeColumn(column.id)}
                            >
                                -
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Data Rows */}
            {data.map((row) => (
                <div 
                    key={row.id} 
                    className="grid border-t border-background" 
                    style={{ gridTemplateColumns: `repeat(${columns.length}, 1fr)` }}
                >
                    {columns.map((column) => (
                        <div key={`${row.id}-${column.id}`} className="p-2">
                            <Input
                                label={row[column.id]}
                                onChange={(e) => handleInputChange(row.id, column.id, e.target.value)}
                                aria-label={`Cell ${column.name} Row ${row.id}`}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default CustomTable;