import React, { useState } from 'react';
import { Input, Button, Select, SelectItem, SelectSection } from '@nextui-org/react';
import { CustomTableProps, CreateTableParams } from '@/types/types';

const CustomTable: React.FC<CustomTableProps> = ({ createTable }) => {

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
        { id: 'column2', name: 'Column 2', inputType: '' },
        { id: 'column3', name: 'Column 3', inputType: '' },
        { id: 'column4', name: 'Column 4', inputType: '' },
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

    const handleColumnNameChange = (columnId: string, value: string) => {
        setColumns(prevColumns =>
            prevColumns.map(column =>
                column.id === columnId ? { ...column, name: value } : column
            )
        );
    };

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
        const params: CreateTableParams = {
            tableName,
            columns: columns.map(column => ({
                name: column.name,
                type: column.inputType,
            })),
        };
        createTable(params);
    };

    return (
        <div className="border border-primary-200 rounded-lg mx-4 p-4 mt-14">
            <span className='text-xl font-bold'>Add a Custom Table:</span>
            <div id="table-name" className="my-4">
                <Input
                    label="Enter Table Name"
                    aria-label="Table Name:"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                />
            </div>
            <table className="w-full border-collapse border">
                <thead className="hidden md:table-header-group">
                    <tr>
                    <th className="border p-2 bg-primary-200 text-foreground">Column Name</th>
                    <th className="border p-2 bg-primary-200 text-foreground">Data Type</th>
                    <th className="border p-2 bg-primary-200 text-foreground">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {columns.map((column) => (
                    <tr
                        key={column.id}
                        className="block border p-2 md:table-row md:border-none"
                    >
                        <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                        <span className="block md:hidden font-bold">Column Name:</span>
                        {column.id === "id" ? (
                            "ID (Default - Key)"
                        ) : (
                            <Input
                            label={`Column Name`}
                            value={column.name}
                            onChange={(e) => handleColumnNameChange(column.id, e.target.value)}
                            aria-label={`Column Name: ${column.name}`}
                            className="w-full"
                            />
                        )}
                        </td>
                        <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                        <span className="block md:hidden font-bold">Data Type:</span>
                        {column.id === "id" ? (
                            "INT/INTEGER AUTOINCREMENT"
                        ) : (
                            <Select
                                className="w-full"
                                label="Column Data Type"
                                onChange={(e) => handleTypeChange(column.name, e.target.value)}
                            >
                            {sqlTypes.map((category) => (
                                <SelectSection
                                title={category.category}
                                key={category.category}
                                className="sticky bg-default-100 shadow-small rounded-small text-foreground"
                                >
                                {category.types.map((type) => (
                                    <SelectItem key={type.name}>{type.name}</SelectItem>
                                ))}
                                </SelectSection>
                            ))}
                            </Select>
                        )}
                        </td>
                        <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                        <span className="block md:hidden font-bold">Actions:</span>
                        {column.id !== "id" && (
                            <Button
                            className="rounded-lg bg-danger text-white"
                            onClick={() => removeColumn(column.id)}
                            >
                            Remove
                            </Button>
                        )}
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-row items-center justify-between w-full pt-2">
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
        </div>
    );
};

export default CustomTable;
