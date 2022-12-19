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


### rating
/raring_senders/mouth (get)
/raring_senders/all_time (get)
/raring_getters/mouth (get)
/raring_getters/all_time (get)


### transactions history
/transaction/:id (get)
/transactions/all (get)
/transactions/incoming (get)
/transactions/outcoming (get)



