use `collaboreat-schema-test`;

select * from `collaboreat-schema-test`.`recipe`;
select * from `collaboreat-schema-test`.`user`;
select * from `collaboreat-schema-test`.`feedback`;
select * from `collaboreat-schema-test`.`mealType`;
select * from `collaboreat-schema-test`.`healthInfo`;
select * from `collaboreat-schema-test`.`recipeHealthInfo`;

select * from recipe r
inner join user u on u.userId = r.userId
inner join feedback f on f.recipeId = r.recipeId
inner join mealType m on m.mealTypeId = r.mealTypeId
inner join recipeHealthInfo rhi on rhi.recipeId = r.recipeId
inner join healthInfo hi on hi.healthInfoId = rhi.healthInfoId;