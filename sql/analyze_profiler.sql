select top 1000 * from t2
select distinct clientprocessid from i1 
select objectname, count(*) from i1 group by objectname
select distinct objectname from inventorymonitor

delete from t1 where clientprocessid is null


select top 50 T.RowNumber, TE.name, T.duration/1000000 DurationMicroSeconds,T.TextData 
from t2 T inner join sys.trace_events TE ON T.EventClass = TE.trace_event_id
where eventclass <> 15
order by T.duration desc

drop table i1
Select * Into i2 From i1 Where 1 = 2

select * from i1 where textdata like '%Base30Days%' order by eventsequence