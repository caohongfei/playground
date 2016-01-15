SELECT distinct table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME like N'%Step%' and TABLE_NAME like N'%Task%';
SELECT distinct table_name FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME like N'%department%';

SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_name = N'tbcontracttaskmodule' order by table_name;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where table_name like N'%taskrealstatus%' order by table_name;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'parametervalue' order by table_name;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'DepartmentName' order by table_name;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'EarliestNeedOperateDT' order by table_name;

SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'contractBadDebtMoneySum' order by table_name;	--v_InvoiceSum_BadDebtMoney

SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'contractNeedInvoiceOrReceiveMoneySum' order by table_name;
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'depositMoneyRemain' order by table_name; --tbContractDeposit
SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'refundMoney' order by table_name;	--tbContractRefund

SELECT * FROM INFORMATION_SCHEMA.COLUMNS where column_name = N'GeneId' order by table_name;

select top(5) * from tbLibGene;
select top(5) * from v_ContractInfo;
select top(5) a.contractguid, a.contractmoney, b.contractmoney from v_ContractInfo a, tbcontractchangesub b, tbcontractchange c where a.contractguid = c.contractguid and b.ChangeGuid = c.ChangeGuid
and a.contractmoney <> b.contractmoney order by a.contractguid;
select * from tbcontractchange where contractguid='00a82f8e-00b6-4fa9-ab23-2ff2c0f30245';
select * from tbContract where contractno like '%GSAE76498%';
select * from tbContract where contractguid='FCD5DC81-1AF2-45D9-A053-C8B4FD1F2C9E';
select * from v_InvoiceSum_BadDebtMoney where contractguid='90eef681-5d17-4926-8168-deb95f9e03b9';

select contractMoney,contractInvoiceMoneySum,contractNeedInvoiceMoneySum,contractReceiveMoneySum,contractNeedReceiveMoneySum,contractBadDebtMoneySum,
contractNeedInvoiceOrReceiveMoneySum,depositMoneyRemain,refundMoney from v_ContractInfo where contractguid='90eef681-5d17-4926-8168-deb95f9e03b9';

select * from tbcontracttaskmodule where contractguid='92233F10-F594-46F6-9584-9D5C95EFAB1E' order by serialno;
select * from tbcontracttaskmodule where taskguid in (select taskguid from tbTaskModule where taskname like '%暂停%');
select * from tbLabExceptionStep where contractguid='7f4913bf-2320-4fb0-846c-09f559703661';

select referredContractNo, expectedFinishDate, earliestFinishDate from gtbTotalSolutionContract;
select distinct identifier from gtbTaskGroup order by identifier;
update gtbTaskGroup set identifier =3 where guid='33bb3efa-bdbb-49d5-ba85-bf406996a5bd'
select * from gtbBusinessStep where tscontractguid='605ce36d-ea63-4f98-b5d2-805f2227f6ab' order by sequence;
select * from gtbBusinessStep where tscontractguid='2d47c00f-5d9c-4688-ae47-ae572ff35d6a' order by sequence;
select count(*) from gtbBusinessStep;
select * from gtbTotalSolutionContract;
select * from gtbTask where progressmemo is not null;

select * from tbHolidays;
select b.userid, * from tbEmployee a, tbsysuserinfo b where (employeename='吴培' or employeename='朱向莹' or employeename='李蹊' 
or employeename='王丽' or employeename='赵治国') and b.employeeguid = a.employeeguid and jobstatusid=0;
select b.userid, a.employeename from tbEmployee a, tbsysuserinfo b where (employeename in ('汪洋', '黄猛', '刘绍梅', '张燕子', '林倩', '喻正刚', '陈新页', '沈强', '王佳美', '吴高永', '张静', '余兆林', '周丽', '李雪', '徐英秀', '文改改', '孙磊', '高志建', '王昕', '蔡丽丽', '王仝伟', '徐秀秀', '丁甜甜', '邓楠', '仲燕', '谷静娟', '朱霞霞', '朱玉琴', '陈敏', '陈红', '沈淑靖', '汪银玲', '丁珊', '刘继国', '黄娴', '张磊', '姜杰', '陈朝晖', '孙虹', '李雪冰')) and b.employeeguid = a.employeeguid and jobstatusid=0 order by b.userid;
select * from v_InvoiceSum;
select * from tbContract where contractnooffline like 'iPad0%' order by contractnooffline desc;
select top(5)* from v_ContractInfo;
select a.contractguid from v_InvoiceSum a, v_ContractInfo b where a.contractguid = b.contractguid and a.ContractBadDebtMoneySum <> b.ContractBadDebtMoneySum;

select employeename, emailc from tbemployee where emailc in ('sale_hzn02@genechem.com.cn', 'sale_hzn01@genechem.com.cn', 'sale_hd0112@genechem.com.cn');
select b.userid, * from tbEmployee a, tbsysuserinfo b where (userid='lqiao') and b.employeeguid = a.employeeguid and jobstatusid=0;
select * from v_UserInfo


select productguid, productname, productsubtypeid from tbProduct a, v_Para_ProductSubType b where a.productsubtypeid = b.parameterid 
and parametervalue like '%大综合%' order by productname;
select * from v_Para_ProductSubType;
select taskguid, taskname from tbTaskModule where taskname like '%实验报告%' order by taskname;
select * from tbTaskModule where taskname like '%报告生成[RNAi-Easy(三保一)-真核表达质粒]%' order by taskname;
select taskguid, taskno, taskname, tasknamepub from tbTaskModule where avaliableflag=1 order by taskname;
select * from tbTaskModule where taskname like '%细胞准备%' order by taskname;
select * from tbContractStatus where contractguid='A7A42B17-BC26-4EF6-8781-F8484521D929';
select distinct contractguid from tbcontracttaskmodule where taskguid='dffaa637-6aa3-4b74-af35-e989b9eb24b4';
select * from tbcontracttaskmodule where contractguid in (select distinct contractguid from tbcontracttaskmodule where taskguid='dffaa637-6aa3-4b74-af35-e989b9eb24b4');

select * from tbTaskStepBasicModuleMapping order by moduleguid;
select count(*) from tbTaskStepBasicModuleMapping;
select count(distinct moduleguid) from tbTaskStepBasicModuleMapping;
select * from tbTaskModuleStepMapping where stepguid='5FA3994A-FF07-4C1C-984C-753109C8BDA1';
select * from tbBasicModule order by moduletypeid;
select * from tbCompanyStructure order by structurename --StructureGuid;

select distinct a.* 
from tbTaskModule a WITH(NOLOCK)
inner join tbTaskModuleStepMapping b WITH(NOLOCK) on a.TaskGuid=b.TaskGuid
inner join tbTaskStepBasicModuleMapping c on b.StepGuid=c.StepGuid
inner join tbBasicModule d on c.ModuleGuid=d.ModuleGuid 
where d.ModuleTypeId=0;

select distinct a.* from tbtaskmodule a, tbTaskModuleStepMapping b, tbTaskStepBasicModuleMapping c, tbBasicModule d where a.taskguid=b.taskguid and b.stepguid=c.stepguid and c.moduleguid=d.moduleguid and d.moduletypeid=0;


select * from tbTaskStep where stepname like '%报告%';
select * from tbTaskModule where taskguid='FBF89696-255C-43B7-8B7F-893F3A52C55F' order by taskno;
select * from tbTaskModule where taskname like '%PathScan%';
select * from tbTaskStep where stepname like '%PathScan%';
select * from tbTaskModuleStepMapping where stepguid='f1299dd8-668e-44ac-85de-d8b037bf214a'

select c.* from tbTaskStep a 
left join tbTaskModuleStepMapping b on a.stepguid=b.stepguid
left join tbTaskModule c on b.taskguid=c.taskguid where a.stepname like '%PathScan%';

select * from tbTaskStep where stepguid in (select distinct gnstepguid from tbLabCellGR where cellreadyguid in (select cellreadyguid from tbLabCellReady where ContractGuid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773'));
select * from tbTaskModule where taskguid in (select distinct taskguid from tbLabCellReady);
select count(contractguid), contractguid from tbLabCellReady group by contractguid having count(contractguid) > 1;
select t.contractguid, count(*) from (select contractguid, CellReadyTeamID, count(*) as count from tbLabCellReady group by contractguid, CellReadyTeamID) t group by t.contractguid having count(*) > 1;
select * from tbContractCellDetail where ContractGuid='8b90ea05-2e96-4791-b743-c34c1de77a5e' order by cellpubguid;
select * from tbLabCellReady where contractguid = 'd39e8f21-dfb0-4d46-ab3d-81b09d120506'
select * from v_Para_CellReadyTeam;

select distinct gnstepguid from tbLabCellGR where cellreadyguid in (select cellreadyguid from tbLabCellReady where ContractGuid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773');
select * from tbLabCellGR where contractguid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773' order by gnstepguid, cellreadyguid;
select * from tbLabCellWB where contractguid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773';
select * from tbLabCellqPCR where contractguid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773';
select * from tbLabCellGN_Send where contractguid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773';

select * from tbLabCellGR a inner join tbLabCellWB b on a.contractguid=b.contractguid where a.gnstepguid = b.stepguid and b.contractguid='AF2F76D3-781A-4C2E-A03B-C8AF0FD45773';

select * from tbContractTaskModuleStepMapping where contractguid='CBBD75A2-746D-4442-A567-E1E08BF5BDBD';
select * from tbContractTaskModuleStepMapping where contractguid='aa389597-b6eb-420f-b7b8-9cb5849283ee' order by stepguid;

select * from tbcontract where contractguid in (select contractguid from tbContractTaskModuleStepMapping group by contractguid, taskguid having count(*) > 1) order by contractno desc;
select * from tbcontract where contractguid in (select contractguid from tbContractTaskModuleStepMapping group by contractguid, stepguid having count(*) > 1) order by contractno desc;

select distinct t.stepname from (select a.contractguid, b.stepname from tbContractTaskModuleStepMapping a, tbTaskStep b where a.stepguid=b.stepguid group by a.contractguid, a.stepguid, b.stepname having count(*) > 1) t;
select distinct t.taskname from (select a.contractguid, b.taskname from tbContractTaskModuleStepMapping a, tbTaskModule b where a.taskguid=b.taskguid group by a.contractguid, a.taskguid, b.taskname having count(*) > 1) t order by t.taskname;

select contractguid, count(*) from tbContractTaskModuleStepMapping group by contractguid, taskguid, stepguid having count(*) > 1

select contractguid, count(*) from tbLabCellReady group by ContractGuid having count(*) > 1;

select * from tbsysuserinfo where adminflagid=1;
update tbsysuserinfo set adminflagid=1 where userid='caohf';


select count(distinct GeneId) from tbContractGene;
select count(geneid), geneid from tbContractGene group by GeneId order by geneid;


select a.referredcontractno, a.productguid DaZongHe, d.productname, b.productguid ERP, c.productname from 
gtbTotalSolutionContract a inner join tbContract b on a.referredguid=b.contractguid 
inner join tbProduct c on b.productguid = c.productguid inner join tbProduct d on a.productguid = d.productguid
where a.productguid <> b.productguid order by  b.productguid;


DBCC USEROPTIONS;

SELECT is_read_committed_snapshot_on FROM sys.databases WHERE name= 'gcappdb'
sp_who 'ACTIVE'
select name, user_access_desc, is_read_committed_snapshot_on from sys.databases;
select * from sys.dm_tran_active_transactions;
select * from sys.dm_tran_database_transactions;
select * from sys.dm_tran_session_transactions;
select * from sys.dm_tran_locks where request_session_id=71;
select * from sys.dm_exec_sessions order by status;
select * from sys.sysprocesses;
select @@spid;

select * from tbcontractstatus where contractguid='b6897c7d-b183-442f-8c11-885b9258a609';


select * from sys.dm_os_ring_buffers WHERE ring_buffer_type= 'RING_BUFFER_CONNECTIVITY';
select distinct ring_buffer_type from sys.dm_os_ring_buffers;
select * from sys.dm_os_ring_buffers;



SELECT CONVERT (varchar(30), GETDATE(), 121) as [RunTime], rbf.ring_buffer_type,
dateadd (ms, rbf.[timestamp]-tme.ms_ticks, GETDATE()) as [Notification_Time],
tme.ms_ticks as [Current Time]
from sys.dm_os_ring_buffers rbf
cross join sys.dm_os_sys_info tme
ORDER BY rbf.timestamp ASC;

select * from sys.dm_os_sys_info;

select DATEADD(dd,-7,GETDATE())
SELECT DATEADD(dd, -1, DATEDIFF(dd, 0, GETDATE()))


select * from tbTaskStep where stepsysid=264;
select * from tbTaskStep where stepsysid=60;
select * from tbTaskStep where stepname like '%报告%' order by stepsysid;


select * from gtbTaskGroup where plannedFinishDate is null;

select pausetype from gtbTask where pausetype is not null;


--查询与暂停相关的任务的两种情况
select b.referredcontractno as 合同编号, a.name as 暂停名称, b.projectowner as 负责人 from gtbTask a, gtbTotalSolutionContract b where a.type=2 and a.tscontractguid=b.guid order by projectowner;
select b.referredcontractno as 合同编号, a.name as 应改为暂停类型, b.projectowner as 负责人 from gtbTask a, gtbTotalSolutionContract b where a.type=1 and a.tscontractguid=b.guid and a.name like '%暂停%' order by projectowner;


select * from tbSysParameter where parametervalue = '合同作废';
select * from tbSysParameter where typeid = 1632;
select contractno, contractstatusid,b.contractenddt from tbContract a, tbContractStatus b 
where a.contractguid=b.contractguid and a.contractstatusid=7 and b.contractenddt is null -- > DATEADD(dd,-7,GETDATE())
order by contractenddt;

select count (contractstatusid) from tbContract a, tbContractStatus b 
where a.contractguid=b.contractguid and b.contractenddt is not null -- > DATEADD(dd,-7,GETDATE())
group by contractstatusid

select distinct realstatusid from v_ContractTaskModule where realEndDT is not null;
select * from v_Para_TaskRealStatus;
select * from tbSysParameter where typeid=1638;

SELECT DATEADD(d,-1,GETDATE()) 'Yesterday'


select employeename, birthday, emailc from tbEmployee where emailc='sale_hd119@genechem.com.cn' order by birthday asc ;

select * from tbtaskmodule where tasknamepub='实物到位延期';
select * from tbProduct where productname in ('吉凯cDNA文库克隆（现货促销）', 'RNAi-定制-shRNA(限人&LV载体 促销）',
'RNAi-定制-shRNA（无对照，限人&LV载体 促销）', 'RNAi-Easy-shRNA（无对照,5D,现货促销）', 'RNAi-Easy-shRNA（无对照,2D,现货促销）', 'RNAi-Easy-shRNA(5D,现货促销）',
'RNAi-Easy-shRNA（2D,现货促销）') order by productname;

select * from tbproduct where productname like '%5D%'

select * from v_Para_ServiceAuditStatus;
select * from tbLabExceptionCommon where ExceptionStepGuid='91A433D4-5E51-422C-AC2D-D32AA3BF6BD6'
select * from tbLabExceptionStep where contractguid='fea4646c-ebc5-4ad4-b0d2-9d7aaeccf387';
select count(*), ExceptionStepGuid from tbLabExceptionCommon group by ExceptionStepGuid having count(*) > 70;
select count(distinct ExceptionStepGuid) from tbLabExceptionCommon;
select count(distinct ExceptionStepGuid) from tbLabExceptionStep;



select * from gtbDailyReportItem order by createdon desc;
update gtbDailyReportItem set version=14 where guid='10a58e19-eb9b-42b4-9412-3f770c2ac0fb'


select * from tbSalesRegion where levelno=0 order by regionname;
select * from v_Para_CellCancerType;
select * from tbSysParameter where typeid=1869;







select distinct a.name from gtbBusinessStep a
left join gtbTotalSolutionContract b on a.tscontractguid=b.guid
where a.category=700





--杨敏需要的日报使用情况统计
select distinct b.userid, a.EmployeeName from tbEmployee a inner join tbsysuserinfo b on a.EmployeeGuid=b.EmployeeGuid where b.UserID in (select distinct userid from gtbDailyReportItem where CreatedOn >= DATEADD(dd, -1, DATEDIFF(dd, 0, GETDATE())) and CreatedOn < DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE())))
select COUNT(*) from gtbDailyReportItem where CreatedOn >= DATEADD(dd, -1, DATEDIFF(dd, 0, GETDATE())) and CreatedOn < DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()));
select COUNT(distinct b.ContractNo) from gtbDailyReportItem a inner join tbContract b on a.ContractGUID = b.ContractGuid where CreatedOn >= DATEADD(dd, -1, DATEDIFF(dd, 0, GETDATE())) and CreatedOn < DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE()));
select b.ContractNo from gtbDailyReportItem a inner join tbContract b on a.ContractGUID = b.ContractGuid where CreatedOn >= DATEADD(dd, -1, DATEDIFF(dd, 0, GETDATE())) and CreatedOn < DATEADD(dd, 0, DATEDIFF(dd, 0, GETDATE())) order by ContractNo;



--根据SQL Server Profiler的输出结果统计性能
select top 50 T.RowNumber, TE.name, T.duration DurationMicroSeconds,T.TextData 
from MyTable T inner join sys.trace_events TE ON T.EventClass = TE.trace_event_id
where eventclass <> 15
order by T.duration desc