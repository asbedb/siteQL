// components/CustomTable.tsx
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectGroup,
    SelectLabel,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CustomTableProps, CreateTableParams } from "@/types/types";

const CustomTable: React.FC<CustomTableProps> = ({
    createTable,
    showToast,
}) => {
    const [tableName, setTableName] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    //Form validation notification state variables
    //state variable to populate select drop down.
    const sqlTypes = [
        // Numeric Types
        {
            category: "Numeric",
            types: [
                { name: "TINYINT" },
                { name: "SMALLINT" },
                { name: "MEDIUMINT" },
                { name: "INT" },
                { name: "BIGINT" },
                { name: "DECIMAL" }, // Adjust precision/scale when using, e.g., 'DECIMAL(10,2)'
                { name: "NUMERIC" }, // Also supports (precision, scale)
                { name: "FLOAT" },
                { name: "DOUBLE" },
                { name: "BIT" }, // Size can vary, e.g., 'BIT(1)'
            ],
        },

        // String Types
        {
            category: "String",
            types: [
                { name: "CHAR" }, // Define length, e.g., 'CHAR(255)'
                { name: "VARCHAR" }, // Define length, e.g., 'VARCHAR(255)'
                { name: "TINYTEXT" },
                { name: "TEXT" },
                { name: "MEDIUMTEXT" },
                { name: "LONGTEXT" },
                { name: "ENUM" }, // Specify values, e.g., 'ENUM("value1", "value2")'
                { name: "SET" }, // Specify set values, e.g., 'SET("value1", "value2")'
            ],
        },

        // Date and Time Types
        {
            category: "Date and Time",
            types: [
                { name: "DATE" },
                { name: "TIME" },
                { name: "DATETIME" },
                { name: "TIMESTAMP" },
                { name: "YEAR" },
            ],
        },

        // Binary Types
        {
            category: "Binary",
            types: [
                { name: "BINARY" }, // Define length, e.g., 'BINARY(255)'
                { name: "VARBINARY" }, // Define length, e.g., 'VARBINARY(255)'
                { name: "TINYBLOB" },
                { name: "BLOB" },
                { name: "MEDIUMBLOB" },
                { name: "LONGBLOB" },
            ],
        },

        // Spatial Types
        {
            category: "Spatial",
            types: [
                { name: "GEOMETRY" },
                { name: "POINT" },
                { name: "LINESTRING" },
                { name: "POLYGON" },
                { name: "MULTIPOINT" },
                { name: "MULTILINESTRING" },
                { name: "MULTIPOLYGON" },
                { name: "GEOMETRYCOLLECTION" },
            ],
        },

        // JSON Type
        {
            category: "JSON",
            types: [{ name: "JSON" }],
        },
    ];
    //main state variable for custom table utilising the first row as a default KEY
    const [columns, setColumns] = useState([
        { id: "id", name: "table_id", inputType: "INT PRIMARY KEY" },
        { id: "column2", name: "Column 2", inputType: "" },
        { id: "column3", name: "Column 3", inputType: "" },
        { id: "column4", name: "Column 4", inputType: "" },
    ]);

    const handleTypeChange = (columnName: string, newType: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.name === columnName
                    ? { ...column, inputType: newType }
                    : column
            )
        );
    };
    const handleColumnNameChange = (columnId: string, value: string) => {
        setColumns((prevColumns) =>
            prevColumns.map((column) =>
                column.id === columnId ? { ...column, name: value } : column
            )
        );
    };
    const removeColumn = (columnId: string) => {
        setColumns((prevColumns) =>
            prevColumns.filter((column) => column.id !== columnId)
        );
    };
    const addColumn = () => {
        const newId = `column${Date.now()}`;
        const newName = `Column ${columns.length + 1}`;
        setColumns((prevColumns) => [
            ...prevColumns,
            { id: newId, name: newName, inputType: "" }, // inputType is initialized here
        ]);
    };
    const handleSubmit = async () => {
        const allColumnsValid = columns.every(
            (column) => column.inputType.trim() !== ""
        );
        if (!tableName) {
            showToast({ message: "Please enter a table name", type: "info" });
            return;
        }
        if (!allColumnsValid) {
            showToast({
                message: "Please select a valid data type for all columns",
                type: "info",
            });
            return;
        }
        const params: CreateTableParams = {
            tableName,
            columns: columns.map((column) => ({
                name: column.name,
                type: column.inputType,
            })),
        };
        // Ensure that the result is a QueryResult object with a success property
        const { disablebtn } = await createTable(params);
        // Set the button disabled state based on success or failure
        setIsButtonDisabled(disablebtn);
    };

    return (
        <div className="flex flex-col w-full h-full border border-primary-200 rounded-lg p-4">
            <span className="text-xl font-bold">Add a Custom Table:</span>
            <div id="table-name" className="mb-6">
                <label
                    htmlFor="tableNameInput"
                    className="block text-sm font-medium mb-1"
                >
                    Enter Table Name
                </label>
                <Input
                    id="tableNameInput"
                    placeholder="e.g., users_data"
                    value={tableName}
                    onChange={(e) => setTableName(e.target.value)}
                />
            </div>
            <table className="w-full border-collapse border">
                <thead className="hidden md:table-header-group">
                    <tr>
                        <th className="border p-2 bg-primary-200 text-foreground">
                            Column Name
                        </th>
                        <th className="border p-2 bg-primary-200 text-foreground">
                            Data Type
                        </th>
                        <th className="border p-2 bg-primary-200 text-foreground">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {columns.map((column) => (
                        <tr
                            key={column.id}
                            className="block border p-2 md:table-row md:border-none"
                        >
                            <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                                <span className="block md:hidden font-bold">
                                    Column Name:
                                </span>
                                {column.id === "id" ? (
                                    <span className="font-mono text-sm px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded inline-block">
                                        ID (Default - Key)
                                    </span>
                                ) : (
                                    <Input
                                        placeholder="Enter column name"
                                        value={column.name}
                                        onChange={(e) =>
                                            handleColumnNameChange(
                                                column.id,
                                                e.target.value
                                            )
                                        }
                                        aria-label={`Column Name: ${column.name}`}
                                    />
                                )}
                            </td>
                            <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                                <span className="block md:hidden font-bold">
                                    Data Type:
                                </span>
                                {column.id === "id" ? (
                                    "INT/INTEGER AUTOINCREMENT"
                                ) : (
                                    <Select
                                        value={column.inputType}
                                        onValueChange={(value) =>
                                            handleTypeChange(column.id, value)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Data Type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sqlTypes.map((category) => (
                                                // Using SelectGroup and SelectLabel for categorized options
                                                <SelectGroup
                                                    key={category.category}
                                                >
                                                    <SelectLabel>
                                                        {category.category}
                                                    </SelectLabel>
                                                    {category.types.map(
                                                        (type) => (
                                                            <SelectItem
                                                                key={type.name}
                                                                value={
                                                                    type.name
                                                                }
                                                            >
                                                                {type.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </td>
                            <td className="flex flex-col md:table-cell md:align-middle md:border md:p-2">
                                <span className="block md:hidden font-bold">
                                    Actions:
                                </span>
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
                <Button type="button" variant="outline" onClick={addColumn}>
                    ➕ Add Column
                </Button>
                <Button
                    type="submit"
                    onClick={handleSubmit}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? "Table Saved" : "Save Table"}
                </Button>
            </div>
        </div>
    );
};

export default CustomTable;
