package learn.collaboreat.data;

import learn.collaboreat.models.HealthInfo;
import learn.collaboreat.models.RecipeHealthInfo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.DataAccessException;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
class RecipeHealthInfoJDBCTemplateRepositoryTest {

    @Autowired
    RecipeHealthInfoJDBCTemplateRepository repository;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() { knownGoodState.set(); }

    @Test
    void shouldFindAll() {
        List<RecipeHealthInfo> rhi = repository.findAll();
        assertNotNull(rhi);
        assertTrue(rhi.size() == 2);
    }

    @Test
    void shouldAdd() {
        RecipeHealthInfo rhi = makeRecipeHealthInfo();
        repository.add(rhi);

        try {
            repository.add(rhi);
            fail("cannot add health info to a recipe twice.");
        } catch (DataAccessException ex) {
            //this is expected.
        }
    }

    @Test
    void shouldDelete() {
        assertTrue(repository.deleteByKey(2, 1));
        assertFalse(repository.deleteByKey(2,1));
    }

    RecipeHealthInfo makeRecipeHealthInfo() {
        RecipeHealthInfo rhi = new RecipeHealthInfo();
        rhi.setRecipeId(1);

        HealthInfo hi = new HealthInfo();
        hi.setHealthInfoId(1);
        hi.setHealthInfoName("Vegan");
        rhi.setHealthInfo(hi);

        return rhi;
    }
}