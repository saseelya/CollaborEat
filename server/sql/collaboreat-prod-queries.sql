use `collaboreat-schema`;

select * from `collaboreat-schema`.`recipe`;
select * from `collaboreat-schema`.`user`;
select * from `collaboreat-schema`.`feedback`;
select * from `collaboreat-schema`.`mealType`;
select * from `collaboreat-schema`.`healthInfo`;
select * from `collaboreat-schema`.`recipeHealthInfo`;
select * from `collaboreat-schema`.`role`;
select * from `collaboreat-schema`.`userRole`;

select * from recipe r
inner join `user` u on u.userId = r.userId
inner join feedback f on f.recipeId = r.recipeId
inner join mealType m on m.mealTypeId = r.mealTypeId
inner join recipeHealthInfo rhi on rhi.recipeId = r.recipeId
inner join healthInfo hi on hi.healthInfoId = rhi.healthInfoId
inner join userRole ur on ur.userId = u.userId
inner join `role` ro on ro.roleId = ur.roleId;