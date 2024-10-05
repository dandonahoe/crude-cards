DO $$
DECLARE
    tables_to_truncate TEXT[] := ARRAY[
        'game_session',
        'score_log',
        'feedback',
        'player',
        'game'
    ]; --Add your table names here
    table_name TEXT;
BEGIN
    FOREACH table_name IN ARRAY tables_to_truncate
LOOP
        EXECUTE format('TRUNCATE TABLE %I CASCADE;', table_name);
    END LOOP;
END $$;
