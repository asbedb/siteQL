import React, { useState } from 'react';
import { Input, Button, Tooltip, Select, SelectItem, SelectSection } from '@nextui-org/react';

const CustomTable: React.FC = () => {

    const sqlTypes = [
        // Numeric Types
        {
            category: 'Numeric',
            types: [
                { name: 'TINYINT' },
                { name: 'SMALLINT' },
                { name: 'MEDIUMINT' },
                { name: 'INT' },
                { name: 'BIGINT' },
                { name: 'DECIMAL' },  // Adjust precision/scale when using, e.g., 'DECIMAL(10,2)'
                { name: 'NUMERIC' },  // Also supports (precision, scale)
                { name: 'FLOAT' },
                { name: 'DOUBLE' },
                { name: 'BIT' }       // Size can vary, e.g., 'BIT(1)'
            ]
        },
    
        // String Types
        {
            category: 'String',
            types: [
                { name: 'CHAR' },         // Define length, e.g., 'CHAR(255)'
                { name: 'VARCHAR' },      // Define length, e.g., 'VARCHAR(255)'
                { name: 'TINYTEXT' },
                { name: 'TEXT' },
                { name: 'MEDIUMTEXT' },
                { name: 'LONGTEXT' },
                { name: 'ENUM' },         // Specify values, e.g., 'ENUM("value1", "value2")'
                { name: 'SET' }           // Specify set values, e.g., 'SET("value1", "value2")'
            ]
        },
    
        // Date and Time Types
        {
            category: 'Date and Time',
            types: [
                { name: 'DATE' },
                { name: 'TIME' },
                { name: 'DATETIME' },
                { name: 'TIMESTAMP' },
                { name: 'YEAR' }
            ]
        },
    
        // Binary Types
        {
            category: 'Binary',
            types: [
                { name: 'BINARY' },       // Define length, e.g., 'BINARY(255)'
                { name: 'VARBINARY' },    // Define length, e.g., 'VARBINARY(255)'
                { name: 'TINYBLOB' },
                { name: 'BLOB' },
                { name: 'MEDIUMBLOB' },
                { name: 'LONGBLOB' }
            ]
        },
    
        // Spatial Types
        {
            category: 'Spatial',
            types: [
                { name: 'GEOMETRY' },
                { name: 'POINT' },
                { name: 'LINESTRING' },
                { name: 'POLYGON' },
                { name: 'MULTIPOINT' },
                { name: 'MULTILINESTRING' },
                { name: 'MULTIPOLYGON' },
                { name: 'GEOMETRYCOLLECTION' }
            ]
        },
    
        // JSON Type
        {
            category: 'JSON',
            types: [
                { name: 'JSON' }
            ]
        }
    ];
    

    const [columns, setColumns] = useState([
        { id: 'id', name: 'table_id', inputType: 'INT PRIMARY KEY' },
        { id: 'column2', name: 'Column 2', inputType: 'text' },
        { id: 'column3', name: 'Column 3', inputType: 'text' },
        { id: 'column4', name: 'Column 4', inputType: 'text' },
    ]);

    const [tableName, setTableName] = useState(''); 
    
    const handleTypeChange = (columnName: string, newType: string) => {
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.name === columnName
                    ? { ...column, inputType: newType }
                    : column
            )
        );
    };
    // Handle changes to column names
    const handleColumnNameChange = (columnId: string, value: string) => {
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.id === columnId ? { ...column, name: value } : column
            )
        );
    };
    // Remove a column from the table
    const removeColumn = (columnId: string) => {
        setColumns(prevColumns => prevColumns.filter(column => column.id !== columnId));
    };
    const addColumn = (id: string, name: string, inputType: string) => {
        setColumns(prevColumns => [
            ...prevColumns,
            { id, name, inputType }
        ]);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('/api/connections/createTable', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    tableName,
                    columns: columns.map(column => ({
                        name: column.name,
                        type: column.inputType,
                    })),
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert(data.message || 'Table created successfully!');
            } else {
                alert(data.error || 'Error creating table.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred.');
        }
    };

    return (
        <div className="border border-background rounded-lg mx-4 p-4">
            <span className='text-xl font-bold'>Add a Custom Table:</span>
            <div id="table-name" className="my-4">
                <Input
                    label="Enter Table Name"
                    aria-label="Table Name:"
                    onChange={(e) => setTableName(e.target.value)}
                />
            </div>
            <table className="min-w-full table-auto border p-4 mb-4">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <td key={column.id} className=" bg-primary-200 text-foreground">
                                {column.id === 'id' ? (
                                    <span>ID (Default - Key)</span>
                                ) : (
                                    <div className="">
                                        <Input
                                            label={`Column Name`}
                                            onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                                            aria-label={`Column Name: ${column.name}`}
                                            className='w-full p-2'
                                            endContent={
                                                <Tooltip content="Remove Column">
                                                    <Button
                                                        className="rounded-lg bg-danger text-white"
                                                        onClick={() => removeColumn(column.id)}
                                                    >
                                                        -
                                                    </Button>
                                                </Tooltip>
                                            }
                                        />
                                    </div>
                                )}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {columns.map((column)=>(
                            <td key={column.id}>
                                {column.id === 'id' ?
                                    <span className="flex items-center gap-2 p-2">
                                        INT/INTEGER AUTOINCREMENT (Default)
                                    </span> :
                                    <Select className="w-full p-2" label="Column Data Type" onChange={(e) => handleTypeChange(column.name, e.target.value)}>
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
                                }
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
            <Button
                onClick={() => addColumn(`column${columns.length + 1}`, `Column ${columns.length+1}`, 'text')}>
                    Add Column
            </Button>
            <Button
                onClick={handleSubmit}
                className='bg-success'>
                    Create Table
            </Button>
        </div>
    );
};

export default CustomTable;
