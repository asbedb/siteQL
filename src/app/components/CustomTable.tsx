import React, { useState } from 'react';
import { Input, Button, Select, SelectItem, SelectSection, Tooltip } from '@nextui-org/react';

const CustomTable: React.FC = () => {
    const [data, setData] = useState([
        { id: 1, column1: 'Row 1, Cell 1', column2: 'Row 1, Cell 2', column3: 'Row 1, Cell 3', column4: 'Row 1, Cell 4' }
    ]);

    const sqlTypes = [
        // Numeric Types
        {
            category: 'Numeric',
            types: [
                { name: 'TINYINT', description: 'Exact numeric, -128 to 127', size: '1 byte' },
                { name: 'SMALLINT', description: 'Exact numeric, -32,768 to 32,767', size: '2 bytes' },
                { name: 'MEDIUMINT', description: 'Exact numeric, -8,388,608 to 8,388,607', size: '3 bytes' },
                { name: 'INT/INTEGER', description: 'Exact numeric, -2,147,483,648 to 2,147,483,647', size: '4 bytes' },
                { name: 'BIGINT', description: 'Exact numeric, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807', size: '8 bytes' },
                { name: 'DECIMAL(p,s)/NUMERIC', description: 'Exact numeric, precision p and scale s', size: 'Variable' },
                { name: 'FLOAT', description: 'Approximate numeric, mantissa precision 23', size: '4 bytes' },
                { name: 'DOUBLE', description: 'Approximate numeric, mantissa precision 53', size: '8 bytes' },
                { name: 'BIT', description: 'Bit value type', size: 'Variable' }
            ]
        },
    
        // String Types
        {
            category: 'String',
            types: [
                { name: 'CHAR', description: 'Fixed-length character string', size: '1-255 chars' },
                { name: 'VARCHAR', description: 'Variable-length character string', size: '1-65,535 chars' },
                { name: 'TINYTEXT', description: 'Variable-length string', size: '255 chars max' },
                { name: 'TEXT', description: 'Variable-length string', size: '65,535 chars max' },
                { name: 'MEDIUMTEXT', description: 'Variable-length string', size: '16,777,215 chars max' },
                { name: 'LONGTEXT', description: 'Variable-length string', size: '4,294,967,295 chars max' },
                { name: 'ENUM', description: 'String object with only one value from a list', size: '1 or 2 bytes' },
                { name: 'SET', description: 'String object that can have 0 or more values from a list', size: '1-8 bytes' }
            ]
        },
    
        // Date and Time Types
        {
            category: 'Date and Time',
            types: [
                { name: 'DATE', description: 'Date value (YYYY-MM-DD)', size: '3 bytes' },
                { name: 'TIME', description: 'Time value (HH:MM:SS)', size: '3 bytes' },
                { name: 'DATETIME', description: 'Date and time value (YYYY-MM-DD HH:MM:SS)', size: '8 bytes' },
                { name: 'TIMESTAMP', description: 'Timestamp value (YYYY-MM-DD HH:MM:SS)', size: '4 bytes' },
                { name: 'YEAR', description: 'Year value (YYYY)', size: '1 byte' }
            ]
        },
    
        // Binary Types
        {
            category: 'Binary',
            types: [
                { name: 'BINARY', description: 'Fixed-length binary string', size: '1-255 bytes' },
                { name: 'VARBINARY', description: 'Variable-length binary string', size: '1-65,535 bytes' },
                { name: 'TINYBLOB', description: 'Binary large object', size: '255 bytes max' },
                { name: 'BLOB', description: 'Binary large object', size: '65,535 bytes max' },
                { name: 'MEDIUMBLOB', description: 'Binary large object', size: '16,777,215 bytes max' },
                { name: 'LONGBLOB', description: 'Binary large object', size: '4,294,967,295 bytes max' }
            ]
        },
    
        // Spatial Types
        {
            category: 'Spatial',
            types: [
                { name: 'GEOMETRY', description: 'Any type of geometry object' },
                { name: 'POINT', description: 'A point in space' },
                { name: 'LINESTRING', description: 'A curve with linear interpolation between points' },
                { name: 'POLYGON', description: 'A polygon' },
                { name: 'MULTIPOINT', description: 'Collection of points' },
                { name: 'MULTILINESTRING', description: 'Collection of linestrings' },
                { name: 'MULTIPOLYGON', description: 'Collection of polygons' },
                { name: 'GEOMETRYCOLLECTION', description: 'Collection of geometry objects' }
            ]
        },
    
        // JSON Type (Available in modern SQL databases)
        {
            category: 'JSON',
            types: [
                { name: 'JSON', description: 'Stores JSON (JavaScript Object Notation) data', size: 'Variable' }
            ]
        }
    ];

    const [columns, setColumns] = useState([
        { id: 'id', name: 'ID (Default)', inputType: 'INT/INTEGER' },
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

    const handleTypeChange = (columnId, value) => {
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.id === columnId ? { ...column, type: value } : column
            )
        );
    };

    return (
        <div className="border border-background rounded-lg mx-4">
            <div id='table-name'>
                <Input
                    label='Enter Table Name'
                    aria-label='Table Name:'
                />
            </div>
            <div className={`grid ${columns.length > 1 ? `grid-cols-${columns.length} 1fr` : "bg-danger"}`} id='table-header'>
                {columns.map((column) => (
                    column.id == 'id'?
                    <div key={column.id} className="p-2 bg-primary-200">
                        <h1>ID (Default for Table)</h1>
                    </div>:
                    <div key={column.id} className="p-2 bg-primary-200">
                        <div className="flex items-center gap-2">
                            <Input
                                label={column.name}
                                onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                                aria-label={`Column Name: ${column.name}`}
                            />
                            <Tooltip content="Remove Column">
                                <Button
                                    className="rounded-lg bg-danger text-white"
                                    size="sm"
                                    onClick={() => removeColumn(column.id)}
                                >
                                    -
                                </Button>
                            </Tooltip>
                        </div>
                    </div>
                ))}
                {/* Table Rows */}
                {columns.map((column) => (
                    <div 
                        key={column.id} 
                        className={`grid ${columns.length > 1 ? `1fr w-full` : ""}`} id='table-row' 
                    >
                        {column.id == 'id'?
                            <div key={`type-${column.id}`} className="flex items-center gap-2 p-2">
                                INT/INTEGER AUTOINCREMENT (Default)
                            </div>:
                            <div key={`type-${column.id}`} className="flex items-center gap-2 p-2">
                                <Select className="w-full" label="Data Type">
                                    {sqlTypes.map((category) => (
                                        <SelectSection
                                            title={category.category}
                                            key={category.category}
                                            className='sticky bg-default-100 shadow-small rounded-small text-foreground'
                                        >
                                                {category.types.map((type) => (
                                                    <SelectItem key={type.name}>{type.name}</SelectItem>
                                                ))}
                                        </SelectSection>
                                    ))}
                                </Select>  
                            </div> 
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};

export default CustomTable;