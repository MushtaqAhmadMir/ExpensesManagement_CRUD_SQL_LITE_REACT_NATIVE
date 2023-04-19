import moment from "moment"
import strings from "../Constants/strings"




const addExpenses = (name, price, type, db, cb) => {
    let newDate = moment().format('DD MMM YYYY')
    console.log(db)
    db.transaction(async (tx) => {
        await tx.executeSql(
            `INSERT INTO ${strings.EXPENSES} (Name, Amount,Date,Type) VALUES (?,?,?,?)`, [name, price, newDate, type], () => {
                cb(true)
            }

        )
    })

}

const updateExpenses = (id, name, price, type, db, cb) => {
    db.transaction((tx) => {
        tx.executeSql(
            `UPDATE ${strings.EXPENSES} SET Name=?,Amount=?,Type=? WHERE id=${id}  `,
            [name, price, type],
            () => {
                cb(true)
                Alert.alert('Success!', 'Your data has been updated.')
            },
            error => { console.log(error) }
        )
    })


}

const deleteExpenses = (id, db, cb) => {
    db.transaction((tx) => {
        tx.executeSql(
            `DELETE FROM ${strings.EXPENSES} WHERE ID = ${id}`,
            [],
            () => {
                console.log('deleted success')
                cb(true)

            },
            error => { console.log(error) }
        )
    })
}

const createTable = (db) => {
    db.transaction((tx) => {
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + strings.EXPENSES
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Amount INTEGER, Date TEXT, Type TEXT);"
        ), () => { console.log('table created'), (error => { console.log(error) }) }
    },

    )

}

const getAllExpenses = (db, callback) => {
    console.log(db)
    let updatedArr = []
    db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM ${strings.EXPENSES}`, [], (tx, results) => {
            console.log("Query completed", results, tx)

            // Get rows with Web SQL Database spec compliance.

            var len = results.rows.length

            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i)
                // console.log(`hyhyhy ` + row)
                updatedArr.push(row)
            }
            callback(updatedArr)
        })
    })


}

const getFilterData = (e, db, callback) => {
    console.log(db,e)
    let updatedArr = []
    db.transaction((tx) => {
        tx.executeSql(`SELECT * FROM ${strings.EXPENSES} WHERE Type Like '%${e}%'`, [], (tx, results) => {
            console.log("Query completed", results, tx)

            // Get rows with Web SQL Database spec compliance.

            var len = results.rows.length

            for (let i = 0; i < len; i++) {
                let row = results.rows.item(i)
                // console.log(`hyhyhy ` + row)
                updatedArr.push(row)
            }
            callback(updatedArr)
        })
    })

}

export {
    addExpenses, updateExpenses, deleteExpenses, getAllExpenses, createTable, getFilterData
}