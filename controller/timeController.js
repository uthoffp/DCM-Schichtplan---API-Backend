const db = require("../config/db_connect");

module.exports.timeActual = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;
    const startDate = req.params.start;
    const endDate = req.params.end;

    const query = `SELECT c.[DATE],
                       c.KindOfDay,
                       (SELECT TOP 1 p.StartTime1
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = 68) as StartTime1,
                       (SELECT TOP 1 p.EndTime1
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as EndTime1,
                       (SELECT TOP 1 p.StartTime2
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as StartTime2,
                       (SELECT TOP 1 p.EndTime2
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as EndTime2,
                       (SELECT TOP 1 p.SpecialTime1
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as SpecialTime1,
                       (SELECT TOP 1 p.SpecialTime2
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as SpecialTime2,
                       (SELECT TOP 1 p.Department
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as Department,
                       (SELECT TOP 1 p.Station1
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as Station1,
                       (SELECT TOP 1 p.Station2
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as Station2,
                       (SELECT TOP 1 p.DivergentDepartmentSt1
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as DivDepartmentsSt1,
                       (SELECT TOP 1 p.DivergentDepartmentSt2
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as DivDepartmentsSt2,
                       (SELECT TOP 1 p.ElectronicTime
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as ElectronicTime,
                       (SELECT TOP 1 p.DailyHoursNet
                       FROM dbo.S_WeekActual p
                       WHERE c.[DATE] = p.[Date]
                       AND p.Company =
                          ${{cId}} AND p.EmployeeNumber = ${{uId}}) as DailyHoursNet
                   FROM dbo.B_Calendar c
                   WHERE c.Company = ${{cId}}
                     AND c.[Date] >= '${{startDate}}'
                     AND c.[Date] <= '${{endDate}}'
                   ORDER BY c.DATE DESC`;
    const result = await db.query(query);
    res.send(result);
}

module.exports.latestTimes = async function (req, res) {
    const cId = req.params.cId;
    const uId = req.params.uId;

    const query = `SELECT TOP 10 E_Date, E_Time, E_Status, EmployeeNumber
                   FROM DCM.dbo.S_ElectronicTime
                   WHERE Company = ${{cId}}
                     AND EmployeeNumber = ${{uId}}
                   ORDER BY E_Date DESC, E_Time DESC`;
    const result = await db.query(query);
    res.send(result);
}