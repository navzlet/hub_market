### auth
/login (post)
{
	"login": "str",
	"password": "str"
}

/register (post)
{
	"login": "str",
	"password": "str",
	"name": "str"
}

### user 
/getUserNames
{
	"search": "str"
}
<!---
для поиска пользователей (во вкладке передать)
можно искать по логину или по имени
-->

/getUser (get)

### shared wallet
/shared_balance/ (get)


### month wallet
/share (post)
{
	"getter_id": "str",
	"amount": "int",
	"comment": "str",
	"date": "YYYY-MM-DD",
	"comment_is_hidden": "1/0"
}
/getMonthBalance (get)


### transactions history
/transaction/:id (get)
/transactions/all (get)
/transactions/incoming (get)
/transactions/outcoming (get)

------------------------------

### rating
/rating_senders/month (get)
/rating_senders/all_time (get)
/rating_getters/month (get)
/rating_getters/all_time (get)



